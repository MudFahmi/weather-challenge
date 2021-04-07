import React from 'react'
import { weekdays } from "../../../consts/index";

import "./CityInfo.scss";
function CityInfo(props) {

    const { data, city, getTemperature } = props
    return (
        <div className="d-flex city-info " >
            <div>
                <h1 className="font-weight-bolder mb-0">{city}</h1>
                <p className="mb-0 font-weight-bold">
                    {weekdays[new Date().getDay()] + " " + new Date().getDate() + ", " + new Date().getFullYear()}
                </p>

                <div className="today-weather-img">
                    {data &&
                        <img src={`https://darksky.net/images/weather-icons/${data?.currently?.icon}.png`} alt="cloudy" />
                    }
                </div>
                <p className="day-status">
                    {data?.currently?.summary}
                </p>
            </div>

            <div className="text-right">
                <p className="today-temperature mb-0">
                    {data && (getTemperature(data?.currently?.apparentTemperature) + "°")}
                </p>
                <p className="max-min-temperature">
                    {data && (getTemperature(Math.max(...data?.hourly?.data.map(obj => obj.apparentTemperature))) + "° / ")}
                    {data && (getTemperature(Math.min(...data?.hourly?.data.map(obj => obj.apparentTemperature))) + "°")}
                </p>
                <p className="font-weight-bolder">
                    {data?.hourly?.summary}

                </p>

            </div>
        </div>

    )
}

export default CityInfo

