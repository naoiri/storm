<template>
    <div class="about">
        <div>
            <Title msg="Om oss" />
            <p>
                <strong
                    >Vi är en grupp Java och Ux studerande som har utvecklat den här appen tillsammans under 5
                    veckor.</strong
                >
            </p>
            <p>Version 1.2.0</p>
            <p>API1:https://opendata.smhi.se/apidocs/warnings/index.html</p>
            <p>API2A: https://opendata.smhi.se/apidocs/metfcst/get-forecast.html</p>
            <p>API2B: https://opendata.smhi.se/apidocs/metfcst/parameters.html</p>
            <p>API3: https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/</p>
        </div>
        <div class="contact">
            <p>Mårten, Java, Email: marten.hernebring@gmail.com</p>
            <p>Naoya, Java, Email: naoya.irikura@skola.goteborg.se</p>
            <p>Suzana, Java, Email: suztra0803@skola.goteborg.se</p>
            <p>Jon, UX, Email: jonkarlstrom@hotmail.com</p>
            <p>Sandra, UX, Email: sandra.125@live.se</p>
            <p>Noa, UX, Email: noalillskog@gmail.com</p>
            <p>Jenny, UX, Email: jy.nilsson@outlook.com</p>
        </div>
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
.contact {
    background-color: white;
    margin-left: 2em;
}

.about {
    width: 310px;
    display: flex;
}
.contact p {
    padding: 0.25em;
}
.about-height {
    height: 2px;
}
</style>
