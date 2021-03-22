<template>
    <div class="home">
        <Title msg="Välkommen" />
        <HelloWorld msg="hej hej här är lite väder" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import Title from "@/components/Title.vue"

export default {
    name: "Home",
    components: {
        HelloWorld,
        Title,
    },
}
</script>
