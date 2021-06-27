import React, { useState } from 'react';
import Conditions from '../Conditions/Conditions';
import classes from './Forecast.module.css';


const Forecast = () => {

    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    const uriEncodedCity = encodeURIComponent(city);
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    function getForecast(e) {
        e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }
        //clear state for new data
        setError(false);
        setResponseObj({});

        setLoading(true);
        let uriEncodedCity = encodeURIComponent(city);
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?&q=${uriEncodedCity}&units=${unit}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": process.env.REACT_APP_API_KEY,
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            }
            //Not change
            // Add
            // The new then above
            // Because its a promise
            // U need to use .then agn to read the output
            // So now u will have smthing like .then.then
        }).then(res => res.json())
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error();
                }
                console.log(response);
                setResponseObj(response);
                setLoading(false);

            }).catch(err => {
                setError(true);
                setLoading(false);
                console.error(err);
            })
    }

    return (
        <div>
            <h2>Conditions</h2>
            {/* <div>{JSON.stringify(responseObj)}</div> */}
            <div>
                <h2>Find Current Weather Conditions</h2>
                <form onSubmit={getForecast}>
                    <input
                        type="text"
                        placeholder="Enter City"
                        maxLength="50"
                        className={classes.TextInput}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label className={classes.Radio}>
                        <input
                            type="radio"
                            names="units"
                            checked={unit === "imperial"}
                            className={classes.Radio}
                            value="imperial"
                            onChange={(e) => setUnit(e.target.value)}
                        />
                        Fahrenheit
                    </label>
                    <label className={classes.Radio}>
                        <input
                            type="radio"
                            names="units"
                            checked={unit === "metric"}
                            value="metric"
                            onChange={(e) => setUnit(e.target.value)}
                        />
                        Celsius &nbsp;
                    </label>

                    <button type = "submit" className={classes.Button}>
                        Get Forecast
                    </button>
                </form>

                <Conditions
                    responseObj={responseObj}
                    error={error}
                    loading={loading}
                />

            </div>
        </div>
    )
}

export default Forecast;



