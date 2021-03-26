<template>
    <div class="ski">
        <Title msg="Skidorter i Sverige" />
        <p>
            Här kan du välja vilken ort i din närhet som har bäst väder för din skidåkning. Sök på ort för att se väder.
        </p>
        <div class="autoComplete_wrapper main">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
        <div id="ski main">
            <div>
                <span><em>Ski resorts</em> </span>
                <span><em> Temperature</em> </span>
            </div>
            <div v-for="skiresort in skiresorts" :key="skiresort.name">
                {{ skiresort.name }} {{ temperature.get(skiresort.name).lo}}
            </div>
        </div>
    </div>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
import Skiresorts from "@/db/skiresorts.js"
//import Cities from "../db/gps.js"
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
            //cities: [],
        }
    },
    created() {
        this.skiresorts = Skiresorts
        //this.cities = Cities
        //GET request using fetch with async/await

        /*Using information from the documentation at:
        https://opendata.smhi.se/apidocs/metfcst/get-forecast.html
        https://opendata.smhi.se/apidocs/metfcst/parameters.html*/

        this.updateWeatherData()
    },
    mounted() {
        new autoComplete({
            data: {
                src: this.skiresorts.name,
            },
            onSelection: (feedback) => {
                document.getElementById("autoComplete").value = feedback.selection.value
            },
        })
    },
    methods: {
        async updateWeatherData() {
            for (const { name, lng, lat } of this.skiresorts) {
                const url = `${BASE_URL}/category/pmp3g/version/2/geotype/point/lon/${lng}/lat/${lat}/data.json`
                const response = await fetch(url)
                const forecast = await response.json()
                const { lowest, highest } = this.findHighAndLowTemp(forecast)
                this.temperature.set(name, { lo: lowest, hi: highest })
            }
        },
        findHighAndLowTemp(forecast) {
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
    },
}
</script>

<style>
.main {
    width: 400px;
}
</style>
