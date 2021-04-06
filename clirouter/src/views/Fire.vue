<template>
    <div class="fire fire-main">
        <Title msg="Brandrisk" />
        <p class="strong">Här kan du få information om vilken brandrisk ett län har.</p>
        <div id="explanation">
            <div><fa icon="fire-alt" /> <fa icon="fire-alt" /> Ingen risk finns </div>
            <div><fa icon="fire-alt" style="color: red"  /> <fa icon="fire-alt" /> Risk för gräsbrand</div>
            <div>
                <fa icon="fire-alt" style="color: red" /> <fa icon="fire-alt" style="color: red" /> Risk för skogsbrand
            </div>
        </div>
        <div class="autoComplete_wrapper main">län:
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
        <div class="firewarning">
            <div id="result">
                <div class="firetext">{{ query }}</div>
                <div class="firetext">{{ time }}</div>
                <div>
                    <span class="firetext">{{ fireWarningMessage }}</span>
                    <span class="firetext" id="fire-balls-area">
                        <div v-if="firstBall"><fa icon="fire-alt" style="color: red" /></div>
                        <div v-else><fa icon="fire-alt" /></div>
                        <div v-if="secondBall"><fa icon="fire-alt" style="color: red" /></div>
                        <div v-else><fa icon="fire-alt" /></div>
                    </span>
                    <p v-if="firstBall" style="color: red" class="text">
                        Att tänka på: Stor försiktighet bör iaktas vid eldning utomhus
                    </p>
                    <p v-if="firstBall" class="text">
                        Risk för gräsbrand finns och utfärdas under våren när risken är stor att bränder och lätt sprids
                        i torrt sjolåsgräs.
                    </p>
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
.fire-main {
    width: 310px;
}

.blue {
    background-color: white;
}

.firetext {
    margin: 0.25rem;
}

.firewarning {
    display: grid;
    grid-template-columns: 1fr;
    border: 2px solid gray;
    padding: 0.5rem;
}
img {
    width: 40px;
    height: 40px;
}

#fire-balls-area {
    display: flex;
}

.empty-ball {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid black;
}

.strong {
    font-weight: bold;
}
</style>
