<template>
    <div class="fire">
        <Title msg="Brandrisk" />
        <p>Här kan du få information om brandrisken.</p>
        <div class="autoComplete_wrapper main">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
        <div class="firewarning main">
            <div>{{ query }}</div>
            <div>{{ fireWarningMessage }}</div>
        </div>
    </div>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
import Counties from "@/db/regions.js"
import Title from "@/components/Title.vue"

export default {
    name: "Fire",
    components: {
        Title,
    },
    data() {
        return {
            counties: [],
            query: "",
            alerts: [],
            fireWarningMessage: "",
        }
    },

    async created() {
        this.counties = Counties
        //GET request using fetch with async/await
        const response = await fetch("https://opendata-download-warnings.smhi.se/api/version/2/alerts.json")
        const json = await response.json()
        this.alerts = json.alert
    },

    mounted() {
        new autoComplete({
            data: {
                src: this.counties,
            },
            onSelection: (feedback) => {
                let isFireWarning = false
                document.getElementById("autoComplete").value = feedback.selection.value
                this.query = feedback.selection.value

                for (const alert of this.alerts) {
                    if (this.query === alert.info.headline) {
                        this.fireWarningMesssage = alert.info.eventCode[3].value
                        isFireWarning = true
                    }
                }

                if (!isFireWarning) {
                    this.fireWarningMessage = "Ingen brandrisk"
                }
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
