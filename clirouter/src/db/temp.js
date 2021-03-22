const cities = [
    "Ale Backen",
    "Sälen-Högflället V",
    "Idre Fjäll",
    "Riksgränsen",
    "Dundret",
    "Ulricehamn",
    "Källebacken",
    "Galgbacken",
    "Svanberga",
]
export default cities
/*const BASE_URL = "https://opendata-download-metfcst.smhi.se/api"

Using information from the documentation at:
https://opendata.smhi.se/apidocs/metfcst/get-forecast.html
https://opendata.smhi.se/apidocs/metfcst/parameters.html

async function updateWeatherData() {
    for (const { name, lng, lat } of cities) {
        const url = `${BASE_URL}/category/pmp3g/version/2/geotype/point/lon/${lng}/lat/${lat}/data.json`
        const response = await fetch(url)
        const forecast = await response.json()
        const { lowest, highest } = findHighAndLowTemp(forecast)
        addForecast(name, lowest, highest)
    }
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
    for (const param of parameters) {
        if (param.name === "t") {
            return param.values[0]
        }
    }

    throw new Error("unable to find parameter for temperature")
}

updateWeatherData()
*/
