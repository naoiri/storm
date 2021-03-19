<template>
    <div class="fire">
        <h1>This is a fire warning page</h1>
        <div class="autoComplete_wrapper">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
        <div id="firewarning">
            <div v-for="county in counties" :key="county.id">
                <router-link :to="'/county/' + county.id">{{ county.name }}</router-link>
                <!--Create next element here -->
            </div>
        </div>
    </div>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
import Counties from "../db/counties.js"
export default {
    name: "Fire",
    data() {
        return {
            counties: [],
        }
    },
    created() {
        this.counties = Counties
    },
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
#firewarning {
    border: 2px solid gray;
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    padding: 1rem;
    width: 600px;
}
</style-->
