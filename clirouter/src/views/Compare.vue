<template>
    <div class="compare">
        <Title msg="Jämför vädret historiskt" />
        <p>Här kan du jämföra hur vädret varit på samma dag för två olika orter.</p>
        <div class="main">
            <span class="text center">Ort 1: </span>
            <span class="autoComplete_wrapper main">
                <input id="autoComplete" type="text" autocomplete="off" />
            </span>
        </div>
        <div class="main">
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
        </div>
        <div class="data main center">
            <span> {{ query }} </span>
        </div>
    </div>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
import Title from "@/components/Title.vue"
import Cities from "@/db/cities.js"
export default {
    name: "Compare",
    components: {
        Title,
    },
    data() {
        return {
            cities: [],
            query: "",
        }
    },
    created() {
        this.cities = Cities
    },
    async mounted() {
        new autoComplete({
            data: {
                src: this.cities,
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
