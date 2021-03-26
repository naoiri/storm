<template>
    <div class="ski-resort">
        <h1>Skidorter i Sverige</h1>
        <p>
            Här kan du välja vilken ort i din närhet som har bäst väder för din skidåkning. Sök på att se ort och väder.
        </p>
        <div id="ski main">
            <div>
                <span><em>Högsta</em> </span>
                <span><em> Lägsta</em> </span>
            </div>
            <div>
                <span><em>10</em> </span>
                <span><em> 5</em> </span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "SkiResort",
    props: [ "resort"],
    data() {
        return {
            temperature: new Map(),
        }
    },
    created() {
        console.log(this.resort)
        //https://opendata-download-metanalys.smhi.se/api/category/mesan1g/version/2/geotype/point/lon/16.158/lat/58.5812/data.json
    },
}
</script>

<style>
.main {
    width: 400px;
}
</style>
