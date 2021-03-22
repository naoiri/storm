<template>
    <div class="fire">
        <Title msg="Brandrisk" />
        <p>Här kan du få information om brandrisken.</p>
        <div class="autoComplete_wrapper main">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
        <div class="firewarning main">
            <div v-for="county in names" :key="county.id">
                <div v-if="show">
                    <router-link :to="'/county/' + county.id">{{ county.name }}</router-link>
                    <span> Test</span>
                </div>
            </div>
            <!--div v-for="fireWarning in fireWarnings" :key="fireWarning.identifier">
                {{ fireWarning.info.headline }}, {{ fireWarning.info.eventCode[0].value }}
            </div-->
        </div>
    </div>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
import Counties from "../db/counties.js"
import Names from "../db/counties copy 2.js"
import Title from "@/components/Title.vue"

export default {
    name: "Fire",
    components: {
        Title,
    },
    data() {
        return {
            counties: [],
            names: [],
            query: undefined,
            show: this.query === undefined,
            //fireWarnings: [],
        }
    },

    async created() {
        this.counties = Counties
        this.names = Names
        /* GET request using fetch with async/await
        const response = await fetch("https://opendata-download-warnings.smhi.se/api/version/2/alerts.json")
        const alerts = await response.json()
        this.fireWarnings = alerts.alert
        console.log(this.fireWarnings[0].info.event)*/
    },
    mounted() {
        new autoComplete({
            data: {
                src: this.counties,
            },
            onSelection: (feedback) => {
                document.getElementById("autoComplete").value = feedback.selection.value
                this.query = feedback.selection.value
            },
        })
    },
}
</script>

<style>
.main {
    width: 400px;
}

.firewarning {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    border: 2px solid gray;
}
</style>
