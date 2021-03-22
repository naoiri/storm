<template>
    <div class="about">
        <Title msg="Om oss i Storm" />
        <p><strong>About us who created this app: we are UX and Java students in Yrgo Gothenburg Sweden.</strong></p>
        <p>Version 1.0.5"</p>
        <p>API1:https://opendata.smhi.se/apidocs/warnings/index.html</p>
        <p>API2A: https://opendata.smhi.se/apidocs/metfcst/get-forecast.html</p>
        <p>API2B: https://opendata.smhi.se/apidocs/metfcst/parameters.html</p>
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
