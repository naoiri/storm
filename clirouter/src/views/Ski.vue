<template>
    <div class="ski">
        <Title msg="Skidorter i Sverige" />
        <p>
            Här kan du välja vilken ort i din närhet som har bäst väder för din skidåkning. Sök på ort för att se väder.
        </p>
        <fa icon="sun" style="color: orange" />
        <fa icon="cloud" style="color: grey" />
        <fa icon="cloud-rain" style="color: blue" />
        <fa icon="snowflake" style="color: aqua" />
        <fa icon="fire-alt" style="color: red" />
        <div id="ski_main">
            <div>
                <span><em>Ski resorts</em> </span>
                <span><em> Temperature</em> </span>
                <div id="v-model-radiobutton">
                    <input
                        type="radio"
                        id="99"
                        value="low"
                        v-model="lowTemp"
                        checked="true"
                        @onSelection="this.onSelection"
                    />
                    <label for="one">High</label>
                    <input type="radio" id="100" value="high" v-model="lowTemp" @onSelection="this.onSelection" />
                    <label for="two">Low</label>
                </div>
                <!--<span> lowTemp: {{ lowTemp }}</span>-->
            </div>

            <div id="result-area">
                <div id="each-result" v-for="skiresort in skiresorts" :key="skiresort.name">
                    {{ skiresort.name }}
                    <div id="weekday-container">
                        <div id="weekday" v-for="weekDay in weekDays" :key="weekDay">{{ weekDay }}</div>
                    </div>
                    <div id="temperature-container">
                        <div
                            id="temperature-area"
                            v-for="temperature in temperature.get(skiresort.name)?.wt"
                            :key="temperature"
                        >
                            {{ temperature }}°C
                        </div>
                    </div>
                    <div id="weather-container">
                        <div
                            id="weather-symbol-area"
                            v-for="weatherSymbol in temperature.get(skiresort.name)?.ws"
                            :key="weatherSymbol"
                        >
                            {{ weatherSymbol }}
                        </div>
                    </div>
                    <!--<span v-if="lowTemp">{{ skiresort.name }} {{ temperature.get(skiresort.name)?.lo }}</span>
                    <span v-else>{{ skiresort.name }} {{ temperature.get(skiresort.name)?.hi }}</span>
                    <div v-for="weekDay in weekDays" :key="weekDay">
                        {{ weekDay }}
                        {{ temperature.get(skiresort.name)?.wt }}
                        <div>{{ temperature.get(skiresort.name)?.ws }}</div>
                    </div>-->
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
            weeklyTemperatures: [],
            weekDays: [],
        }
    },
    created() {
        this.skiresorts = Skiresorts
        this.updateWeatherData()
    },
    methods: {
        async updateWeatherData() {
            for (const { name, lng, lat } of this.skiresorts) {
                const url = `${BASE_URL}/category/pmp3g/version/2/geotype/point/lon/${lng}/lat/${lat}/data.json`
                const response = await fetch(url)
                const forecast = await response.json()
                const { lowest, highest } = this.findLowTemp(forecast)
                const weatherSymbols = this.findWeeklyWeatherForecastInOneCity(forecast)
                const weeklyTemperatures = this.findWeeklyTemperatureInOneCity(forecast)
                this.temperature.set(name, { lo: lowest, hi: highest, wt: weeklyTemperatures, ws: weatherSymbols })
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

            //weatherValues.pop() //Deletes the last(8th element)
            //weatherValues.pop()

            for (const weatherValue of weatherValues) {
                if (weatherValue <= 4) {
                    weatherSymbols.push("sun")
                } else if (weatherValue <= 7) {
                    weatherSymbols.push("cloud")
                } else if (weatherValue <= 24) {
                    weatherSymbols.push("clo-rai")
                } else if ((weatherValue >= 15 && weatherValue <= 17) || (weatherValue >= 25 && weatherValue <= 27)) {
                    weatherSymbols.push("snow-flake")
                }
            }
            return weatherSymbols
        },

        //Returns a list of weekly temperatures in one city
        findWeeklyTemperatureInOneCity(forecast) {
            let temperatures = []
            for (const hourlyData of forecast.timeSeries) {
                if (hourlyData.validTime.includes("T12")) {
                    temperatures.push(this.findTemperature(hourlyData.parameters))
                }
            }
            //temperatures.pop()
            //temperatures.pop()
            return temperatures
        },

        findLowTemp(forecast) {
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
        onSelection: (evt) => {
            if (evt.target.value === "low") {
                document.getElementById("100").checked = true
                document.getElementById("99").checked = false
                this.lowTemp = true
                this.temperature.get(this.skiresort.name)?.lo
            } else if (evt.target.value === "high") {
                document.getElementById("100").checked = false
                document.getElementById("99").checked = true
                this.lowTemp = false
                this.temperature.get(this.skiresort.name)?.hi
            }
        },

        //Returns a list of weekdays starting today.
        getWeekDays(forecast) {
            const weekDays = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"]
            const today = this.convertDateToWeekday(forecast.timeSeries[0].validTime)
            let startIndex = 0
            
            //Finds what day it is today, which is the start index 
            for (let i = 0; i < weekDays.length; i++) {
                if (weekDays[i] === today) {
                    startIndex = i //ex. 4
                }
            }

            let modifiedWeekDays = []
            for (let i = 0; i < 10; i++) {
                modifiedWeekDays[i] = weekDays[startIndex]
                startIndex++ // ex.5
                if (startIndex > 6) {
                    startIndex = 0
                }
            }
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
.main {
    width: 400px;
}

.hidden {
    display: none;
}
#each-result {
    border: 1px solid black;
    border-radius: 10px;
    margin: 1em;
    padding: 0.5em;
    display: flex;
}

#each-result * {
    margin: 0.5em;
}
</style>
