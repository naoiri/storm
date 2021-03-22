<template>
    <div class="ski">
        <Title msg="Ski resorts in Sweden" />
        <p>
            Här kan du välja vilken ort i din närhet som har bäst väder för din skidåkning. Sök på att se ort och väder.
        </p>
        <div class="autoComplete_wrapper">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
        <div id="ski">
            <div>
                <span>Ski resorts </span>
                <span> Temperature </span>
            </div>
            <div v-for="skiresort in skiresorts" :key="skiresort.name">
                <router-link :to="'/ski/' + skiresort.name">{{ skiresort.name }}</router-link>
                <span> Shows the actual temp in celcius degrees </span>
            </div>
            <!--div class="city">
        <h1>City</h1>
        <div class="autoComplete_wrapper">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
            <div id="city">
            <div v-for="city in city" :key="city.name">
                <router-link :to="'/city/' + city.name">{{ city.name }}</router-link>
           -->
        </div>
    </div>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
import Skiresorts from "../db/skiresorts.js"
//import City from "../db/cities.js"
//import City from "../db/city.js"
import Title from "@/components/Title.vue"

export default {
    name: "Ski",
    components: {
        Title,
    },
    data() {
        return {
            skiresorts: Skiresorts,
        }
    },
    /*export default {
    name: "city",
    data() {
        return {
            city: city,
        }
    },*/
    mounted() {
        new autoComplete({
            data: {
                src: ["apa", "bepa", "cepa"],
            },
            onSelection: (feedback) => {
                document.getElementById("autoComplete").value = feedback.selection.value
            },
        })
    },
}
</script>

<!--style>

}
</style-->
