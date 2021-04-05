<template>
    <div class="compare">
        <Title msg="Jämför vädret historiskt" />
        <p class="strong">Se vilken temperatur det var historiskt t.o.m. December 2020.</p>
        <DatePicker class="main data blue" id="datePicker" v-model="date" />
        <div class="autoComplete_wrapper updownpad">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
        <div class="data main center">
            <div>
                Vädret i {{ current }} för datum ({{ date.toLocaleDateString("sv") }}) var: {{ temperatureData }} grader
                Celcius.
            </div>
        </div>
        <div class="data main center">
            <div>
                Vädret i {{ current2 }} för datum ({{ date.toLocaleDateString("sv") }}) var:
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
                this.first = false
            } else {
                this.temperatureData2 = this.getCorrectHourData()
                this.current2 = this.query
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
        //let result = csv.map((a) => a.Namn)
        console.log(this.ids.length)
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
.blue {
    background-color: #83abba;
}

.left-align {
    left-padding: 0px;
}
.strong {
    font-weight: bold;
}
h1 {
    font-size: x-large;
}

p {
    font-size: x-small;
}

.main {
    width: 260px;
    margin: 1rem;
    padding: 0.25rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.updownpad {
    width: 250px;
    margin-up: 1rem;
    margin-down: 1rem;
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
