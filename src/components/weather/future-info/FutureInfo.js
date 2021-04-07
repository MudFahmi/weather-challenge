import React, { useState } from 'react'
import { weekdays } from "../../../consts/index";

import "./FutureInfo.scss";

function FutureInfo(props) {
    const { data, getTemperature } = props
    const [type, setType] = useState("hourly")

    return (
        <div className="future-info">

            <div className="d-flex">
                <p className={"title mr-5 " + (type === "hourly" ? "active" : "")}
                    onClick={() => setType("hourly")}
                >
                    Hourly
                </p>
                <p className={"title " + (type === "daily" ? "active" : "")}
                    onClick={() => setType("daily")}
                >
                    Daily
                </p>
            </div>

            <hr className="herozintal-line mt-0" />

            <div className="scroll-results">


                {data &&
                    data[type]?.data.map((elm, index) => (
                        <div key={elm.time} className="mr-4">
                            <p className="text-center mb-0">
                                {!index && type === "hourly" ? "Now" : ""}
                                {!index && type === "daily" ? "Today" : ""}
                                {index ? (type === "hourly" ? new Date(elm.time * 1000).getHours() + ":00" : weekdays[new Date(elm.time * 1000).getDay()]) : ""}
                            </p>
                            <div className="weather-icn">
                                <img src={`https://darksky.net/images/weather-icons/${elm.icon}.png`} alt={elm.icon} />
                            </div>
                            {type === "hourly" ?
                                <p className="hourly-weather-temp">
                                    {getTemperature(elm.apparentTemperature) + "°"}
                                </p>
                                :
                                <p className="daily-weather-temp">
                                    {getTemperature(elm.apparentTemperatureHigh) + "°/" + getTemperature(elm.apparentTemperatureLow) + "°"}
                                </p>
                            }
                        </div>

                    ))}
            </div>
        </div >

    )
}

export default FutureInfo

