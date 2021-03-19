<template>
    <hello-world msg="Ski resorts in Sweden" />
</template>

<script>
import Fire from "./components/Fire.vue"

export default {
    name: "App",
    components: {
        Fire,
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
