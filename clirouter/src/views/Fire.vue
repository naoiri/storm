<template>
    <div class="fire">
        <h1>This is a fire warning page</h1>
        <div id="firewarning">
            <div v-for="county in counties" :key="county.id">
                <router-link :to="'/county/' + county.id">{{ county.name }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Counties from "../db/generic.json"
export default {
    name: "Fire",
    data() {
        return {
            counties: [],
        }
    },
    async created() {
        this.counties = await Counties.json()
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
