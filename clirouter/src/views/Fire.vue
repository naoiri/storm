<template>
    <div class="fire">
        <h1>This is a fire warning page</h1>
        <div id="firewarning">
            <div v-for="county in counties" :key="county.id">
                <router-link :to="'/county/' + county.id">{{ county.name }}</router-link>
                <span> Test</span>
            </div>
            <!--div v-for="fireWarning in fireWarnings" :key="fireWarning.identifier">
                {{ fireWarning.info.headline }}, {{ fireWarning.info.eventCode[0].value }}
            </div-->
        </div>
    </div>
</template>

<script>
import Counties from "../db/counties.js"

export default {
    name: "Fire",

    data() {
        return {
            counties: [],
            //fireWarnings: [],
        }
    },

    async created() {
        this.counties = Counties
        /* GET request using fetch with async/await
        const response = await fetch("https://opendata-download-warnings.smhi.se/api/version/2/alerts.json")
        const alerts = await response.json()
        this.fireWarnings = alerts.alert
        console.log(this.fireWarnings[0].info.event)*/
    },
}
</script>

<!--style>
#firewarning {
    border: 2px solid gray;
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    padding: 1rem;
    width: 600px;
}
</style-->
