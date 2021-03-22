<template>
    <div class="about">
        <Title msg="Jämför vädret historiskt" />
        <p>Här kan du jämföra hur vädret varit på samma dag för två olika orter.</p>
    </div>
</template>

<script>
import Title from "@/components/Title.vue"
export default {
    name: "Compare",
    components: {
        Title,
    },
}
</script>
