<template>
    <div class="fire">
        <Title msg="Brandrisk" />
        <p>Här kan du få information om brandrisken.</p>
        <div class="autoComplete_wrapper main">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
        <div class="firewarning main">
            <span>{{ query }}</span>
            <span> {{ fireWarningMsg }}</span>
        </div>
    </div>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
import Counties from "@/db/counties copy 3.js"
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
            query: "",
            fireWarnings: [],
            fireWarningMsg: "",
        }
    },

    async created() {
        this.counties = Counties
        //GET request using fetch with async/await
        const response = await fetch("https://opendata-download-warnings.smhi.se/api/version/2/alerts.json")
        const alerts = await response.json()
        this.fireWarnings = alerts.alert
    },

    mounted() {
        new autoComplete({
            data: {
                src: this.counties,
            },
            onSelection: (feedback) => {
                let fireWarningIssued = false
                document.getElementById("autoComplete").value = feedback.selection.value
                this.query = feedback.selection.value

                for (const eachAlert of this.fireWarnings) {
                    if (this.query === eachAlert.info.headline) {
                        this.fireWarningMsg = eachAlert.info.eventCode[3].value
                        fireWarningIssued = true
                    }
                }

                if (!fireWarningIssued) {
                    this.fireWarningMsg = "Ingen brandrisk"
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
