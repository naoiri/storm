<template>
    <div class="compare">
        <Title msg="Jämför vädret historiskt" />
        <p>Se vilken temperatur det var historiskt t.o.m. December 2020.</p>
        <DatePicker id="datePicker" v-model="date" />
        <div class="main">
            <span class="text center">Ort 1: </span>
            <span class="autoComplete_wrapper main">
                <input id="autoComplete" type="text" autocomplete="off" />
            </span>
        </div>
        <!--div class="main">
            <span class="text center">Ort 2: </span>
            <span class="autoComplete_wrapper main">
                <input id="city2" type="text" autocomplete="off" />
            </span>
        </div>
        <div class="main">
            <span class="text center">Välj datum: </span>
            <span class="autoComplete_wrapper main">
                <input id="date" type="text" autocomplete="off" />
            </span>
        </div-->
        <div class="data main center">
            <div>
                Vädret i {{ current }} för datum ({{ date.toLocaleDateString("sv") }}) var: {{ temperatureData }} grader
                Celcius.
            </div>
        </div>
    </div>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
import Title from "@/components/Title.vue"
import Cities from "@/db/cities.js"
//import Sunshine from "@/db/metobs_sunshineTime_active_sites.csv"
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
            current: "",
            query: "",
            parameter1: [],
            temperatureData: "",
            date: new Date(Date.now()),
            //Sunshine,
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
            this.temperatureData = this.parameter1[this.parameter1.length - 1].value
            this.current = this.query
        },
        onChange() {},
    },
    computed: {
        getTemperatureId() {
            switch (this.query) {
                case "Stockholm":
                    return "98230"
                case "Göteborg":
                    return "71420"
                case "Malmö":
                    return "52350"
                case "Uppsala":
                    return "97510"
                case "Västerås":
                    return "96350"
                case "Örebro":
                    return "94190"
                case "Helsingborg":
                    return "62040"
                default:
                    return "00000"
            }
        },
    },
    created() {
        this.cities = Cities
    },
    mounted() {
        const interaction = this
        new autoComplete({
            data: {
                src: this.cities,
            },
            onSelection: (feedback) => {
                document.getElementById("autoComplete").value = feedback.selection.value
                this.query = feedback.selection.value
                interaction.updateData()
            },
        })
    },
}
</script>

<style>
.main {
    width: 350px;
    display: grid;
    grid-template-columns: 1fr 1fr;
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
}
</style>
