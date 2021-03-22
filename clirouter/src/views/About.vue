<template>
    <div class="about">
        <Title msg="Om oss i Storm" />
        <p>Text</p>
        <p>Version 1.0.6"</p>
        <p>API:https://opendata.smhi.se/apidocs/warnings/index.html</p>
        <p>Email: marten.hernebring@gmail.com</p>
    </div>
</template>

<script>
import Title from "@/components/Title.vue"
export default {
    name: "About",
    components: {
        Title,
    },
}
</script>
