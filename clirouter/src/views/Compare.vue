<template>
    <div class="compare">
        <Title msg="Jämför orter" />
        <p class="strong">Jämför temperaturen mellan två orter t.o.m. December 2020. Skriv in båda orterna nedan:</p>
        <div class="redborder">
            <DatePicker class="main data blue" id="datePicker" v-model="date" />
        </div>
        <div class="updownpad">
            <span class="text center">{{ whichCity }}</span>
            <span class="autoComplete_wrapper">
                <input id="autoComplete" type="text" autocomplete="off" />
            </span>
        </div>
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
            whichCity: "Ort 1: ",
        }
    },
    methods: {
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
                this.whichCity = "Ort 2: "
                this.first = false
            } else {
                this.temperatureData2 = this.getCorrectHourData()
                this.current2 = this.query
                this.whichCity = "Ort 1: "
                this.first = true
            }
        },
        getCorrectHourData() {
            return this.parameter1[this.parameter1.length - 1 - this.diff_hours(new Date(Date.now()), this.date)].value
        },
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
.left-align {
    left-padding: 0px;
}
h1 {
    font-size: x-large;
}

p {
    font-size: x-small;
}

.main {
    width: 260px;
    margin: 0.5rem;
    padding: 0.25rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.updownpad {
    width: 250px;
    margin-up: 0.5rem;
    margin-down: 0.5rem;
    padding: 0.25rem;
}

.text {
    width: 100px;
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
