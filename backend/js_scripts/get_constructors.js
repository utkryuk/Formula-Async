require('dotenv').config()
const mongoose = require('mongoose')
const Season = require('../models/season')
const Constructor_Name = require('../models/constructor_name')
const axios = require('axios')

const mongoUrl = process.env.MONGODB_URI
console.log(mongoUrl)


const addObject = async (instance) => {

    try {
        const result = await instance.save();
        console.log(result.id);  // this will be the new created ObjectId
    } catch(error) {
        console.log(error)
    }
}

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    })



// for all constructors
// http://ergast.com/api/f1/constructors.json?limit=1000
// http://ergast.com/api/f1/constructors/mclaren/drivers.json?limit=1000

let constructors = {}

// season_end_positions
const season_end_positions = (constructorName, year) => {
    return axios.get(`http://ergast.com/api/f1/${year}/constructors/${constructorName}/constructorStandings.json?limit=1000`)
        .then(response => {            
            const total_points = response.data['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'][0]['points']
            const season_end_position = response.data['MRData']['StandingsTable']['StandingsLists'][0]['ConstructorStandings'][0]['position']
            // console.log("points => ", total_points, season_end_position)
            return [total_points, season_end_position]

        })
        .catch(error => {
            console.log(`Error in season_end_position: ${constructorName} ${year}`, error.message)
        })
}

const constructorDrivers = (constructorName, year) => {
    return axios.get(`http://ergast.com/api/f1/${year}/constructors/${constructorName}/drivers.json?limit=1000`)
        .then(response => {
            const temp = response.data['MRData']['DriverTable']['Drivers']
            drivers = []
            for (let i = 0; i < temp.length; i++) {
                drivers.push(`${temp[i]['givenName']} ${temp[i]['familyName']}`)
            }
            // console.log(drivers)
            return drivers
        })
        .catch(error => {
            console.log(`Error in drivers: ${constructorName} ${year}`, error.message)
        })

}

const points_per_race = (constructorName, year) => {
    return axios.get(`http://ergast.com/api/f1/${year}/constructors/${constructorName}/results.json?limit=1000`)
        .then(response => {
            const races = response.data['MRData']['RaceTable']['Races']
            points = []
            for (let i = 0; i < races.length; i++) {
                results = races[i]['Results']
                
                let singleRacePoint = 0
                for (let j = 0; j < results.length; j++) {
                    singleRacePoint += parseFloat(results[j]['points'])
                }
                // points.push({
                //     raceName: races[i]['raceName'],
                //     points_per_race: singleRacePoint
                // })
                points.push(singleRacePoint)
            }
            
            // console.log(points)
            return points
        })
        .catch(error => {
            console.log(`Error in points_per_race: ${constructorName} ${year}`, error.message)
        })
}

function callF1Api(year) {
    return axios.get(`http://ergast.com/api/f1/${year}/constructors.json?limit=1000`)
    .then(async response => {
        allConstructors = response.data['MRData']['ConstructorTable']['Constructors']
        await Promise.all(allConstructors.map(async constructorInfo => {
            if (constructorInfo.name in constructors) {
                // season_end_position and total_points
                const values = await season_end_positions(constructorInfo['constructorId'], year)
                if (constructors[constructorInfo.name]['total_points'] === undefined) {
                    constructors[constructorInfo.name]['total_points'] = [{
                        year: year,
                        total_points: parseFloat(values[0])
                    }]
    
                }
                else if (constructors[constructorInfo.name]['total_points']) {
                    constructors[constructorInfo.name]['total_points'].push({
                        year: year,
                        total_points: parseFloat(values[0])
                    })
    
                }

                if (constructors[constructorInfo.name]['season_end_position'] === undefined) {
                    constructors[constructorInfo.name]['season_end_position'] = [{
                        year: year,
                        season_end_position: parseFloat(values[1])
                    }]
    
                }
                else if (constructors[constructorInfo.name]['season_end_position']) {
                    constructors[constructorInfo.name]['season_end_position'].push({
                        year: year,
                        season_end_position: parseFloat(values[1])
                    })
                }
                
                // drivers
                const drivers = await constructorDrivers(constructorInfo['constructorId'], year)
                if (constructors[constructorInfo.name]['drivers'] === undefined) {
                    constructors[constructorInfo.name]['drivers'] = [{
                        year: year,
                        drivers: drivers
                    }]
    
                }
                else if (constructors[constructorInfo.name]['drivers']) {
                    constructors[constructorInfo.name]['drivers'].push({
                        year: year,
                        drivers: drivers
                    })
                }

                // points_per_race
                const points_per_race_by_constructor = await points_per_race(constructorInfo['constructorId'], year)
                if (constructors[constructorInfo.name]['points_per_race'] === undefined) {
                    constructors[constructorInfo.name]['points_per_race'] = [{
                        year: year,
                        points_per_race: points_per_race_by_constructor
                    }]
                }
                else if (constructors[constructorInfo.name]['points_per_race']) {
                    constructors[constructorInfo.name]['points_per_race'].push({
                        year: year,
                        points_per_race: points_per_race_by_constructor
                    })
                }

                
            }
            else {
                // initalizing dict object
                constructors[constructorInfo.name] = {}
                constructors[constructorInfo.name]['name'] = constructorInfo.name
                constructors[constructorInfo.name]['nationality'] = constructorInfo.nationality    

                // season_end_position and total_points
                const values = await season_end_positions(constructorInfo['constructorId'], year)
                constructors[constructorInfo.name]['total_points'] = [{
                    year: year,
                    total_points: parseFloat(values[0])    
                }]

                constructors[constructorInfo.name]['season_end_position'] = [{
                    year: year,
                    season_end_position: parseFloat(values[1])
                }]
                
                // drivers
                const drivers = await constructorDrivers(constructorInfo['constructorId'], year)
                constructors[constructorInfo.name]['drivers'] = [{
                    year: year,
                    drivers: drivers
                }]

                // points_per_race
                const points_per_race_by_constructor = await points_per_race(constructorInfo['constructorId'], year)
                constructors[constructorInfo.name]['points_per_race']  = [{
                    year: year,
                    points_per_race : points_per_race_by_constructor
                }]

            }
        
        }))
    })
    .catch(error => {
        console.log("Error: ", error.message)
    })

}

const asyncCall = () => {
    console.log("start")
    for (let year = 2010; year<=2021; year++) {
        callF1Api(year).then(() => {
            if (year === 2021) {
                // console.log("constructors =>", JSON.stringify(constructors))
                for (const [key, value] of Object.entries(constructors)) {
                    addObject(new Constructor_Name(value))
                }
            }
        })
    }
}

asyncCall()
