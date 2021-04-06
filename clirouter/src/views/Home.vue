<template>
    <div class="home">
        <Title msg="Välkommen" />
        <Links
            class="strong"
            msg="Den här tjänsten hjälper dig få koll på väder som varit, kommande väder på närliggande skidorter samt hur brandrisken förväntas bli de närmsta dagarna."
        />
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
.home {
    width: 290px;
}
</style>
