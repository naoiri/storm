<template>
    <div class="compare">
        <div class="paddingright">
            <Title msg="Jämför orter" class="main" />
            <div class="redborder main">
                <DatePicker class="data blue" id="datePicker" v-model="date" />
            </div>
            <div class="updownpad main">
                <div class="text center">Fyll i för {{ whichCity }}. Ort 1: {{ current }}, Ort 2: {{ current2 }}</div>
                <div class="autoComplete_wrapper">
                    <input id="autoComplete" type="text" autocomplete="off" />
                </div>
            </div>
            <p class="strong main">Jämför temperaturen mellan två orter t.o.m. December 2020.</p>
        </div>
        <div>
            <div class="data main center">
                <div>
                    Ort 1: Vädret i {{ current }} för datum ({{ date.toLocaleDateString("sv") }}) var:
                    {{ temperatureData }} grader Celcius.
                </div>
            </div>
            <div class="data main center">
                <div>
                    Ort 2: Vädret i {{ current2 }} för datum ({{ date.toLocaleDateString("sv") }}) var:
                    {{ temperatureData2 }} grader Celcius.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
import Title from "@/components/Title.vue"
import csv from "@/db/metobs_airtemperatureInstant_active_sites.csv"
import DatePicker from "@/components/DatePicker.vue"
export default {
    name: "Compare",
    components: {
        Title,
        DatePicker,
    },
    data() {
        return {
            cities: [],
            ids: [],
            current: "",
            current2: "",
            query: "",
            parameter1: [],
            temperatureData: "",
            temperatureData2: "",
            date: new Date(Date.now()),
            first: true,
            whichCity: "Ort 1",
        }
    },
    methods: {

        //Fecthes api response and updates weather history in two cities.
        async updateData() {
            const response = await fetch(
                "https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/" +
                    this.getTemperatureId +
                    "/period/latest-months/data.json"
            )
            const json = await response.json()
            this.parameter1 = json.value
            if (this.first) {
                this.temperatureData = this.getCorrectHourData()
                this.current = this.query
                this.whichCity = "Ort 2"
                this.first = false
            } else {
                this.temperatureData2 = this.getCorrectHourData()
                this.current2 = this.query
                this.whichCity = "Ort 1"
                this.first = true
            }
        },

        //Returns what temperature it was at 12 that day 
        getCorrectHourData() {
            return this.parameter1[this.parameter1.length - 1 - this.diff_hours(new Date(Date.now()), this.date)].value
        },

        //Returns the hour difference in time from now and at 12 on a certain day. 
        diff_hours(dt2, dt1) {
            var diff = (dt2.getTime() - dt1.getTime()) / 1000
            diff /= 60 * 60
            if (diff > 12) {
                diff -= 12
            }
            return Math.abs(Math.round(diff))
        },
    },
    computed: {
        //Gets temperature id of the searched city
        getTemperatureId() {
            for (let i = 0; i < this.cities.length; i++) {
                if (this.cities[i] === this.query) {
                    return this.ids[i]
                }
            }
            return null
        },
    },
    created() {
        this.cities = csv.map((a) => a.Namn)
        this.ids = csv.map((b) => b.Id)
    },
    mounted() {
        const interaction = this
        new autoComplete({
            data: {
                src: this.cities,
            },
            onSelection: (feedback) => {
                document.getElementById("autoComplete").value = ""
                this.query = feedback.selection.value
                interaction.updateData()
            },
        })
    },
}
</script>

<style>
.paddingright {
    padding-right: 7.5em;
}

.left-align {
    left-padding: 0px;
}
h1 {
    font-size: x-large;
}

.main {
    width: 260px;
    margin: 0.5rem;
    padding: 0.25rem;
    display: grid;
    grid-template-columns: 1fr;
}

.updownpad {
    width: 250px;
    margin-up: 0.5rem;
    margin-down: 0.5rem;
    padding: 0.25rem;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center; /* for single line flex container */
    align-content: center; /* for multi-line flex container */
}

.data {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    border: 2px solid gray;
    background-color: white;
}
</style>
