<template>
    <div class="fire">
        <Title msg="Brandrisk" />
        <!--DatePicker /-->
        <p>Här kan du få information om brandrisken.</p>
        <div class="autoComplete_wrapper main">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
        <div class="firewarning main">
            <div id="result">
                <div>{{ query }}</div>
                <div>Hämtad: {{ time }}</div>
                <div>{{ fireWarningMessage }}</div>
                <div id="fire-balls-area">
                    <div v-if="firstBall"><img src="../assets/flamma.png" alt="fire" /></div>
                    <div class="empty-ball" v-else></div>
                    <div v-if="secondBall"><img src="../assets/flamma.png" alt="fire" /></div>
                    <div class="empty-ball" v-else></div>
                </div>
            </div>
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
            firstBall: false,
            secondBall: false,
            time: "",
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
                this.firstBall = false
                this.secondBall = false
                document.getElementById("autoComplete").value = feedback.selection.value
                this.query = feedback.selection.value

                for (const alert of this.alerts) {
                    if (this.query === alert.info.headline) {
                        this.fireWarningMessage = alert.info.eventCode[3].value
                        this.time = alert.sent
                        isFireWarning = true
                        if (this.fireWarningMessage === "Risk Gräsbrand") {
                            this.firstBall = true
                            this.secondBall = false
                        } else if (this.fireWarningMessage === "Risk Skogsbrand") {
                            this.firstBall = true
                            this.secondBall = true
                        }
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
    width: 600px;
}

.firewarning {
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    border: 2px solid gray;
}
img {
    width: 40px;
    height: 40px;
}

#result {
    display: flex;
    justify-content: space-between;
}

#fire-balls-area {
    display: flex;
    justify-content: space-between;
}

.empty-ball {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid black;
}
</style>
