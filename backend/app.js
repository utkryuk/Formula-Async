const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const Driver = require('./models/driver')
const Season = require('./models/season')

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


app.use(cors())
app.use(express.json())




addObject(new Driver({
    name: 'Utkarsh',
    constructorName: 'Ferrari',
    season_end_position: 1,
    total_points: 400,
    points_per_race: [],
    country: 'India'
}))

addObject(new Season({
    year: '2022',
    driver: "61dde13f81b6b4dad2cb9f55"
}))

// if (process.env.NODE_ENV === 'development') {
//     app.use(middleware.requestLogger)
// }

// app.use(middleware.tokenExtractor)

// app.use('/api/blogs', blogsRouter)
// app.use('/api/users', usersRouter)
// app.use('/api/login', loginRouter)

// if(process.env.NODE_ENV === 'test') {
//     app.use('/api/testing', testingRouter)
// }

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)


module.exports = app