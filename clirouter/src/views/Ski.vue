<template>
    <div class="ski">
        <Title msg="Skidorter i Sverige" />
        <p>
            Här kan du välja vilken ort i din närhet som har bäst väder för din skidåkning. Sök på ort för att se väder.
        </p>
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
            <div v-for="skiresort in skiresorts" :key="skiresort.name">
                <span v-if="lowTemp">{{ skiresort.name }} {{ temperature.get(skiresort.name)?.lo }}</span>
                <span v-else>{{ skiresort.name }} {{ temperature.get(skiresort.name)?.hi }}</span>
            </div>
            <span v-for="weatherSymbol in weatherSymbols" :key="weatherSymbol">
                {{ weatherSymbol }}
            </span>
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
                this.temperature.set(name, { lo: lowest, hi: highest })
                this.findWeeklyWeatherForecast(forecast)
            }
        },

        findWeeklyWeatherForecast(forecast) {
            let weatherValues = []
            for (const hourlyData of forecast.timeSeries) {
                if (hourlyData.validTime.includes("T12")) {
                    weatherValues.push(hourlyData.parameters[18].values[0])
                }
            }
            weatherValues.pop() //Deletes the last(8th element)
            weatherValues.pop()

            for (const weatherValue of weatherValues) {
                if (weatherValue <= 4) {
                    this.weatherSymbols.push("Sunny")
                } else if (weatherValue <= 7) {
                    this.weatherSymbols.push("Cloudy")
                } else if (weatherValue <= 24){
                    this.weatherSymbols.push("Rainy")
                } else if (weatherValue <= 27) {
                    this.weatherSymbols.push("Snowy")
                }
            }
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
</style>
