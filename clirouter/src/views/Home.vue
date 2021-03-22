<template>
    <div class="home">
        <HelloWorld msg="Välkommen" />
        <Intro msg="hej hej här är lite väder" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import Intro from "@/components/Intro.vue"

export default {
    name: "Home",
    components: {
        HelloWorld,
        Intro,
    },
}
</script>
