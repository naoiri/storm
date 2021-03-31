<template>
    <div class="ski">
        <Title msg="Skidorter i Sverige" />
        <p class="strong">
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
body {
    background-color: lightblue;
}
.main {
    width: 400px;
}
div {
    color: blue;
}
p {
    color: black;
    font-size: 30px;
    text-align: center;
}

.hidden {
    display: none;
}
</style>
