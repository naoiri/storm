<template>
    <div class="about">
        <Title msg="Om oss i Storm" />
        <p>
            <strong>Vi är en grupp bestående utav fyra UX studenter och fyra Java studenter på Yrgo Göteborg.</strong>
        </p>
        <p>Version 1.1.1"</p>
        <p>API1:https://opendata.smhi.se/apidocs/warnings/index.html</p>
        <p>API2A: https://opendata.smhi.se/apidocs/metfcst/get-forecast.html</p>
        <p>API2B: https://opendata.smhi.se/apidocs/metfcst/parameters.html</p>
        <p>API3: "https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/"</p>
        <p class="white">Email: marten.hernebring@gmail.com</p>
        <p class="white">Email: marten.hernebring@gmail.com</p>
        <p class="white">Email: marten.hernebring@gmail.com</p>
        <p class="white">Email: marten.hernebring@gmail.com</p>
        <p class="white">Email: marten.hernebring@gmail.com</p>
        <p class="white">Email: marten.hernebring@gmail.com</p>
        <p class="white">Email: marten.hernebring@gmail.com</p>
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

<style>
.about {
    width: 310px;
}
.white {
    padding: 0.25em;
    background-color: white;
}
.about-height {
    height: 2px;
}
</style>
