<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <hello-world msg="Ski resorts in Sweden" />
  <temp/>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"
import Temp from "./components/Temp.vue"

export default {
  name: "App",
  components: {
    HelloWorld,
    Temp,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
