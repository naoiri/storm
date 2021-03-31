<template>
    <div class="home">
        <Title msg="Välkommen" />
        <Links class="strong" msg="hej hej här är lite väder" />
    </div>
</template>

<script>
// @ is an alias to /src
import Title from "@/components/Title.vue"
import Links from "@/components/Links.vue"

export default {
    name: "Home",
    components: {
        Title,
        Links,
    },
}
</script>
<style>
.strong {
    font-weight: bold;
}
</style>
