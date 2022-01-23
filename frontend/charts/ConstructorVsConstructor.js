import { useEffect, useRef, useState } from 'react'
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { Autocomplete, TextField } from '@mui/material';
import YearPicker from '../components/YearPicker';
import { Box } from '@mui/system';

const ConstructorVsConstructor = () => {

    const sdk = new ChartsEmbedSDK({ baseUrl: 'https://charts.mongodb.com/charts-project-0-fijle' });
    const chartDiv = useRef(null)
    const chartId = ["84b9fdfe-5d9c-4b5a-8d82-6731fff37eb6", "882a7729-2c02-4697-b760-772c5719c7e8"];

    const [year, setYear] = useState(new Date('2021-01-01'))
    const [constructors, setConstructors] = useState({"constructor1": "mercedes", "constructor2": "red_bull"})

    const [filter, setFilter] = useState([
        {
            $match: {
                "year": 2021
            }
        },
        {
            $addFields: {
                "races": {
                    $map: {
                        input: "$races",
                        as: "constructor",
                        in: {
                        "round": "$$constructor.round",
                        "race_id": "$$constructor.race_id",
                            "constructors": {
                                    $filter: {
                                    input: "$$constructor.constructors",
                                    as: "constructor",
                                    cond: {
                                        $in: [
                                        "$$constructor.constructorId",
                                        ["mercedes", "red_bull"]
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    ])

    const [rendered, setRendered] = useState(false)
    const [chart, setChart] = useState(sdk.createChart({ chartId: chartId[1], height: '800px', width: '1000px', theme: "dark", autoRefresh: true, filter: { "year": year.getFullYear()} }));


    useEffect(() => {
        chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
    }, [chart]);

    useEffect(() => {
        setFilter({ "year": year.getFullYear() });
    }, [year]);    
    
    useEffect(() => {
        if (rendered) {
            chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
        }
    }, [chart, filter, rendered]);
    
    const updateConstructors = (event, newValue) => {
        event.preventDefault();
        if (event.target.id.includes("constructor1input")){
            setConstructors({...constructors, "constructor1": newValue});
        } else if (event.target.id.includes("constructor2input")){
            setConstructors({ ...constructors, "constructor2": newValue })
        }
        if (constructors.constructor1 && constructors.constructor2){
            const selected_constructors = Object.values(constructors).slice().sort();
            const queried_constructors = ["mercedes", "red_bull"]
            if(selected_constructors.length === queried_constructors.length && queried_constructors.slice().sort().every(
                function (value, index) {
                    return value === selected_constructors[index];
                })){
                setChart(sdk.createChart({ chartId: chartId[0], height: '600px', width: '800px', theme: "dark", autoRefresh: true, filter: { "year": year.getFullYear() } }))
            }
        }
    }

    return (
        <div className = "flex justify-center space-around">
            <div className="field">
            <Box className = "mt-5">
                <Autocomplete disablePortal id="constructor1input" onChange={updateConstructors} options={list_of_constructors} sx={{ width: 300 }} isOptionEqualToValue={(option, value) => option.label== value} defaultValue={"Mercedes"} renderInput={(params) => <TextField {...params} label="Constructor 1" />} />
                <Autocomplete disablePortal id="constructor2input" onChange={updateConstructors} options={list_of_constructors} sx={{ width: 300 }} isOptionEqualToValue={(option, value) => option.label == value} defaultValue={"Ferrari"} renderInput={(params) => <TextField {...params} label="Constructor 2" />} />
            </Box>
            </div>
            <div>
                <YearPicker 
                className = "mt-40"
                year={year} setYear={setYear} minDate={new Date("2007-01-01")} />
                </div>
            <div className="chart my-5" ref={chartDiv} />
        </div>
  
    )
}

const list_of_constructors = [{
    label: 'Mercedes',
    constructorId: 'mercedes'
},
{
    label: 'Ferrari',
    constructorId: 'ferrari'
},
{
    label: 'Red Bull',
    constructorId: 'red_bull'
},
{
    label: 'Mclaren',
    constructorId: 'mclaren'
},
{
    label: 'Alpine',
    constructorId: 'alpine'
},
{
    label: 'Aston Martin',
    constructorId: 'aston_martin'
},
{
    label: 'Williams',
    constructorId: 'williams'
},
{
    label: 'Alpha Tauri',
    constructorId: 'alphatauri'
},
{
    label: 'Alfa Romeo',
    constructorId: 'alfa'
},
{
    label: 'Haas',
    constructorId: 'haas'
}]

export default ConstructorVsConstructor