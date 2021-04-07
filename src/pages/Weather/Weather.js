import axios from 'axios';
import { useEffect, useState } from 'react';

import CityInfo from '../../components/weather/city-info/CityInfo';
import FutureInfo from '../../components/weather/future-info/FutureInfo';

import "./Weather.scss";
const API_KEY = "a177f8481c31fa96c3f95ad4f4f84610"

function Weather() {
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const [type, setType] = useState('F')
    const [city, setCity] = useState('')

    useEffect(() => {
        if (navigator.geolocation) {
            // Call getCurrentPosition with success and failure callbacks
            navigator.geolocation.getCurrentPosition(getCoords, showError);
        }
        else {
            setError("Sorry, your browser does not support geolocation services.");
        }
    }, [])

    function getTemperature(temp) {
        if (type === "C") {
            return Math.round((temp - 32) * 5 / 9)
        }
        return Math.round(temp)
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.")
                break;
            default:
                setError("An unknown error occurred.")
                break;
        }
    }

    function getCoords(position) {
        //position.coords.longitude;
        //position.coords.latitude;
        const coords = position.coords
        console.log({ coords });


        axios(`https://cors.bridged.cc/https://api.darksky.net/forecast/${API_KEY}/${coords.latitude},${coords.longitude}`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                setData(res.data)
            })
            .catch(err => {

                //console.log(err.response.data);
                setError(err?.response?.data)
            })

        axios(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                const data = res.data;
                setCity(data?.city || data?.locality)
            })
            .catch(err => setError(err))


    }

    console.log(data);
    return (
        <div className="weather-page-wrapper">

            {/* header */}
            <nav className="navbar bg-transparent px-0">
                <div className="container-fluid px-0">
                    <h3 className="font-weight-bold ">
                        INSTAWEATHER
            </h3>
                    <div className="d-flex font-weight-bold">
                        <div
                            className={"flip-temp " + (type === "C" ? "celsius-selected" : "")}
                            onClick={() => setType('C')}
                        >
                            C
            </div>

                        <div
                            className={"flip-temp " + (type === "F" ? "fahrenheit-selected" : "")}
                            onClick={() => setType('F')}
                        >
                            F
            </div>
                    </div>
                </div>
            </nav>

            {!!error ?
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                :
                <>
                    { !data &&
                        <div className="overlay">
                            <div className="spinner-border" role="status" />
                        </div>
                    }
                    <CityInfo data={data} city={city} getTemperature={getTemperature} />
                    <FutureInfo data={data} getTemperature={getTemperature} />
                </>
            }

        </div>
    );
}

export default Weather;
