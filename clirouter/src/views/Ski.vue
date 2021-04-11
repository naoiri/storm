<template>
    <div class="ski maxwidth">
        <Title msg="Skidorter i Sverige" />
        <p class="strong">
            Här kan du se hur vädret och temperaturen skiljer sig mellan de största skidorterna i Sverige
        </p>

        <div id="ski_main">
            <div>
                <span><em>Skidorter</em> </span>
                <span><em> Temperatur</em> </span>
            </div>

            <div id="result-area">
                <div id="button-area">
                    <input type="radio" id="av" value="Av" name="choices" v-on:change="showAv" />
                    <label for="av">Visa genomsnittlig dygnstemperatur</label>
                    <br />
                    <input type="radio" id="low" value="Low" name="choices" v-on:change="showLow" />
                    <label for="low">Visa lägsta dygnstemperatur</label>
                    <br />
                    <input type="radio" id="high" value="High" name="choices" v-on:change="showHigh" />
                    <label for="high">Visa högsta dygnstemperatur</label>
                    <br />
                </div>
                <div class="data maxwidth" id="each-result" v-for="skiresort in skiresorts" :key="skiresort.name">
                    <div id="weekday-container">
                        <table id="result-table">
                            <tr>
                                <th colspan="7" class="skiresortname">
                                    {{ skiresort.name }}
                                </th>
                            </tr>
                            <tr>
                                <th v-for="weekDay in weekDays" :key="weekDay">{{ weekDay }}</th>
                            </tr>
                            <tr>
                                <td v-for="weatherSymbol in temperature.get(skiresort.name)?.ws" :key="weatherSymbol">
                                    <span v-if="weatherSymbol === 'sol'">
                                        <fa icon="sun" style="color: orange" />
                                    </span>
                                    <span v-else-if="weatherSymbol === 'moln'">
                                        <fa icon="cloud" style="color: grey" /><!--{{ weatherSymbol }}-->
                                    </span>
                                    <span v-else-if="weatherSymbol === 'regn'">
                                        <fa icon="cloud-rain" style="color: blue" /><!--{{ weatherSymbol }}-->
                                    </span>
                                    <span v-else-if="weatherSymbol === 'snö'">
                                        <fa icon="snowflake" style="color: aqua" /><!--{{ weatherSymbol }}-->
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="avChecked" id="av-temperature-container">
                                <td v-for="avTemperature in temperature.get(skiresort.name)?.av" :key="avTemperature">
                                    {{ avTemperature }}°C
                                </td>
                            </tr>
                            <tr v-if="lowChecked" id="low-temperature-container">
                                <td v-for="lowTemperature in temperature.get(skiresort.name)?.lo" :key="lowTemperature">
                                    {{ lowTemperature }}°C
                                </td>
                            </tr>
                            <tr v-if="highChecked" id="high-temperature-container">
                                <td
                                    v-for="highTemperature in temperature.get(skiresort.name)?.hi"
                                    :key="highTemperature"
                                >
                                    {{ highTemperature }}°C
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Skiresorts from "@/db/skiresorts.js"
import Title from "@/components/Title.vue"

const BASE_URL = "https://opendata-download-metfcst.smhi.se/api"

export default {
    name: "Ski",
    components: {
        Title,
    },
    data() {
        return {
            skiresorts: [],
            temperature: new Map(),
            lowTemp: false,
            weatherSymbols: [],
            weekDays: [],
            avChecked: true,
            lowChecked: false,
            highChecked: false,
        }
    },
    created() {
        this.skiresorts = Skiresorts
        this.updateWeatherData()
    },

    methods: {
        showAv() {
            this.avChecked = true
            this.lowChecked = false
            this.highChecked = false
        },

        showLow() {
            this.avChecked = false
            this.lowChecked = true
            this.highChecked = false
        },

        showHigh() {
            this.avChecked = false
            this.lowChecked = false
            this.highChecked = true
        },

        async updateWeatherData() {
            for (const { name, lng, lat } of this.skiresorts) {
                const url = `${BASE_URL}/category/pmp3g/version/2/geotype/point/lon/${lng}/lat/${lat}/data.json`
                const response = await fetch(url)
                const forecast = await response.json()
                const weatherSymbols = this.findWeeklyWeatherForecastInOneCity(forecast)
                const dailyLowest = this.findDailyLowTemperature(forecast)
                const dailyHighest = this.findDailyHighTemperature(forecast)
                const averageTemperatures = this.getDailyAverageTemperatures(forecast)

                this.temperature.set(name, {
                    lo: dailyLowest,
                    hi: dailyHighest,
                    av: averageTemperatures,
                    ws: weatherSymbols,
                })
                this.weekDays = this.getWeekDays(forecast)
            }
        },

        findWeeklyWeatherForecastInOneCity(forecast) {
            let weatherValues = [] //1, 2, 3.....
            let weatherSymbols = [] //"sun", "cloud"...

            for (const hourlyData of forecast.timeSeries) {
                if (hourlyData.validTime.includes("T12")) {
                    weatherValues.push(hourlyData.parameters[18].values[0])
                }
            }

            for (const weatherValue of weatherValues) {
                if (weatherValue <= 4) {
                    weatherSymbols.push("sol")
                } else if (weatherValue <= 7) {
                    weatherSymbols.push("moln")
                } else if (weatherValue <= 24) {
                    weatherSymbols.push("regn")
                } else if ((weatherValue >= 15 && weatherValue <= 17) || (weatherValue >= 25 && weatherValue <= 27)) {
                    weatherSymbols.push("snö")
                }
            }

            while (weatherSymbols.length > 7) {
                weatherSymbols.pop()
            }

            return weatherSymbols
        },

        getDailyAverageTemperatures(forecast) {
            let tenDaysData = this.sortInfoByDay(forecast)
            let averageTemperatures = []
            let hourlyTemperatures = []
            for (const dailyData of tenDaysData) {
                for (const hourlyData of dailyData) {
                    hourlyTemperatures.push(Number(this.findTemperature(hourlyData.parameters)))
                }
                let sum = 0
                for (const temperature of hourlyTemperatures) {
                    sum += temperature
                }
                averageTemperatures.push(sum / hourlyTemperatures.length)
                hourlyTemperatures = []
            }

            let roundedAverageTemperatures = []
            //Avrundning
            for (let temperature of averageTemperatures) {
                temperature = temperature * 10 //tex. 375.4321
                temperature = Math.floor(temperature) //375
                temperature = temperature / 10 // 37.5
                roundedAverageTemperatures.push(temperature)
            }

            while (roundedAverageTemperatures.length > 7) {
                roundedAverageTemperatures.pop()
            }
            return roundedAverageTemperatures
        },

        sortInfoByDay(forecast) {
            let tenDaysData = []
            let dailyData = []
            let todayStr = forecast.timeSeries[0].validTime.substr(9, 1) //"3"
            let todayNum = Number(todayStr) //3

            for (const hourlyData of forecast.timeSeries) {
                //When the day has changed, collected data for one day is pushed to tenDaysData
                if (Number(hourlyData.validTime.substr(9, 1)) !== todayNum) {
                    tenDaysData.push(dailyData)
                    dailyData = [] //Resets daily info after it is pushed to tenDaysData
                    todayNum++
                    if (todayNum === 10) {
                        todayNum = 0
                    }
                } else {
                    dailyData.push(hourlyData) //Collect data for one day
                }
            }

            return tenDaysData
        },

        findDailyLowTemperature(forecast) {
            let dailyLowTemperature = []
            let tenDaysData = this.sortInfoByDay(forecast) //Returns 10 days data sorted day by day
            for (const dailyData of tenDaysData) {
                let lowest = 1000

                for (const hourlyData of dailyData) {
                    let temp = this.findTemperature(hourlyData.parameters)
                    if (temp < lowest) {
                        lowest = temp
                    }
                }
                dailyLowTemperature.push(lowest)
            }
            while (dailyLowTemperature.length > 7) {
                dailyLowTemperature.pop()
            }
            return dailyLowTemperature
        },

        findDailyHighTemperature(forecast) {
            let dailyHighTemperature = []
            let tenDaysData = this.sortInfoByDay(forecast) //Returns 10 days info day sorted day by day
            for (const dailyData of tenDaysData) {
                let highest = -1000

                for (const hourlyData of dailyData) {
                    let temp = this.findTemperature(hourlyData.parameters)
                    if (temp > highest) {
                        highest = temp
                    }
                }
                dailyHighTemperature.push(highest)
            }
            while (dailyHighTemperature.length > 7) {
                dailyHighTemperature.pop()
            }
            return dailyHighTemperature
        },

        findLowHighTemp(forecast) {
            let highest = -1000
            let lowest = 1000
            for (const hourlyData of forecast.timeSeries) {
                const temp = this.findTemperature(hourlyData.parameters)
                if (temp > highest) {
                    highest = temp
                }
                if (temp < lowest) {
                    lowest = temp
                }
            }
            return { lowest, highest }
        },

        findTemperature(parameters) {
            for (const param of parameters) {
                if (param.name === "t") {
                    return param.values[0]
                }
            }

            throw new Error("unable to find parameter for temperature")
        },

        //Returns a list of weekdays starting today.
        getWeekDays(forecast) {
            const weekDays = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"]
            const today = this.convertDateToWeekday(forecast.timeSeries[0].validTime)
            let startIndex = 0
            //Finds what day it is today, which is the start index
            for (let i = 0; i < weekDays.length; i++) {
                if (weekDays[i] === today) {
                    startIndex = i
                }
            }

            let modifiedWeekDays = []
            for (let i = 0; i < 10; i++) {
                modifiedWeekDays[i] = weekDays[startIndex]
                startIndex++
                if (startIndex > 6) {
                    startIndex = 0
                }
            }

            while (modifiedWeekDays.length > 7) {
                modifiedWeekDays.pop()
            }
            modifiedWeekDays.splice(0, 1, "Idag")
            return modifiedWeekDays
        },

        //Returns the weekday converted from the given date
        convertDateToWeekday(validTime) {
            let tempStr1 = validTime
            let tempStr2 = validTime
            let tempStr3 = validTime
            let yearStr = tempStr1.substr(0, 4)
            let monthStr = tempStr2.substr(5, 2)
            let dayStr = tempStr3.substr(8, 2)

            let jsMonth = monthStr - 1
            let dayOfWeekStrSvenska = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"]

            let date = new Date(yearStr, jsMonth, dayStr)
            return dayOfWeekStrSvenska[date.getDay()]
        },
    },
}
</script>

<style>
.maxwidth {
    max-width: 328px;
}
body {
    color: black;
}
.data {
    background-color: white;
}

.hidden {
    display: none;
}

.skiresortname {
    font-size: 20px;
    padding-bottom: 15px;
    text-align: left;
}

table {
    border-collapse: collapse;
}

td,
th {
    text-align: center;
}

td:nth-child(even) {
    background-color: #e6e6e6;
}

th:nth-child(even) {
    background-color: #e6e6e6;
}
#each-result {
    border: 1px solid black;
    border-radius: 10px;
    margin: 1em;
    padding: 0.5em;
    display: flex;
    width: 23rem;
}

#each-result * {
    margin: 0.5em;
}
</style>
