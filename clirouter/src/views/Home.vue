<template>
    <div class="home">
        <Title msg="Välkommen" />
        <Links
            class="strong"
            msg="Den här tjänsten hjälper dig att få koll på väder som har varit, kommande väder på närliggande skidorter samt hur brandrisken förväntas bli de närmsta dagarna. Vår förhoppning är att du skall använda appen som ett hjälpmedel för att underlätta val av kläder. Detta kan vara tex när du skall vistas i naturen eller planerar att grilla. Du kan också titta tillbaka på hur temperaturen har varit på två olika orter."
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
