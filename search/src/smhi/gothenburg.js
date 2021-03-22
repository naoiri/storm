const BASE_URL = "https://opendata-download-metfcst.smhi.se/api"

const cities = [{ name: "Göteborg", lng: 16.158, lat: 58.5812 }]

/*Request
To check the valid tnpm run buildimes for the current forecast, you can use https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/validtime.json (with correct category and version ). In the answer you get the valid time list. You can use the answers to specify what valid time to ask for in the MultiPoint request.

GET /api/category/{category}/version/{version}/validtime.json
Category	For now, there are one category for the API, pmp3g.
Version	When the API for a given category is changed, the version is increased. Old versions will be available for a limited time.*/

/* 
Using information from the documentation at:
https://opendata.smhi.se/apidocs/metfcst/get-forecast.html
https://opendata.smhi.se/apidocs/metfcst/parameters.html
*/
async function updateWeatherData() {
    //for (const { name, lng, lat } of cities) {
    const url = `${BASE_URL}/category/pmp3g/version/2/geotype/point/lon/${cities[0].lng}/lat/${cities[0].lat}/data.json`
    const response = await fetch(url)
    const forecast = await response.json()
    const { lowest, highest } = findHighAndLowTemp(forecast)
    addForecast(cities[0].name, lowest, highest)
    //}
}

function findHighAndLowTemp(forecast) {
    let highest = -1000
    let lowest = 1000
    for (const hourlyData of forecast.timeSeries) {
        const temp = findTemperature(hourlyData.parameters)
        if (temp > highest) {
            highest = temp
        }
        if (temp < lowest) {
            lowest = temp
        }
    }
    return { lowest, highest }
}

function findTemperature(parameters) {
    console.log(parameters)
    for (const param of parameters) {
        if (param.name === "t") {
            return param.values[0]
        }
    }

    throw new Error("unable to find parameter for temperature")
}

function addForecast(name, lowest, highest) {
    const nameDiv = document.createElement("div")
    const lowDiv = document.createElement("div")
    const highDiv = document.createElement("div")
    nameDiv.innerText = name
    lowDiv.innerText = lowest
    highDiv.innerText = highest

    const forecast = document.getElementById("forecast")
    forecast.append(nameDiv)
    forecast.append(lowDiv)
    forecast.append(highDiv)
}

updateWeatherData()
