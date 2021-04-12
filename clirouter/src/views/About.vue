<template>
    <div class="about">
        <Title msg="Om oss" class="omoss-title "/>
        <p class="strong absolute-left">
            <strong
                >Vi är en grupp Java och Ux studerande som har utvecklat den här appen tillsammans under 5
                veckor.</strong
            >
        </p>

        <div class="contact">
            <div class="api">
                <p>Version 1.2.0</p>
                <p>API1:https://opendata.smhi.se/apidocs/warnings/index.html</p>
                <p>API2A: https://opendata.smhi.se/apidocs/metfcst/get-forecast.html</p>
                <p>API2B: https://opendata.smhi.se/apidocs/metfcst/parameters.html</p>
                <p>API3: https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/</p>
            </div>
            <div>
                <p><strong>Mårten, Java</strong>, Email: <br />marten.hernebring@gmail.com</p>
                <p><strong>Naoya, Java</strong>, Email: <br />naoya.irikura@skola.goteborg.se</p>
                <p><strong>Suzana, Java</strong>, Email: <br />suztra0803@skola.goteborg.se</p>
                <p>
                    <strong>Jon, studerar Ux-design på Yrgo</strong>, har pluggat systemvetenskap och psykologi sedan
                    innan. Största intressen är matlagning och musik. När Sverige inte bjuder på permafrost gillar Jon
                    att vara ute i naturen, paddla kajak och vandra.<br />
                    Email: jonkarlstrom@hotmail.com
                </p>
                <p>
                    <strong>Sandra, studerar UX-design på Yrgo</strong>. Har de senaste 6 åren jobbat inom produktion
                    och främst i projekt för att utveckla produktion av nya produkter, så som bioreaktorer och
                    litsiumjonbatterier. Sandra åker helst på långa resor till varmare breddgrader med fina vågor för
                    surfing eller höga berg att klättra på. Har även en teknisk gymnasieutbildning och en salig
                    blandning av universitetskurser i bagaget. <br />Email: sandra.125@live.se
                </p>
                <p>
                    <strong>Noa, studerar UX-design</strong> just nu och har hållit på med lite olika grejer innan. Har
                    jobbat på landvetterflygplats och lite lätt som föreskolevikarie. Har sedan tidigare en Tekniskt
                    gymnasie utbildning på Hulebäck. <br />Email: noalillskog@gmail.com
                </p>
                <p>
                    <strong>Jenny Studerar Ux-design</strong> och har sedan innan en socialantropologisk utbildning i
                    bagaget samt kunskaper inom områden som media- och kommunikation, verksamhetsplanering,
                    hälsosamordning och administration. Jenny har även en konstnärlig ådra och en förkärlek för att
                    uttrycka den genom blandteknik på stora skivor av plywood, måla möbler eller smida i silver.
                    <br />Email: jy.nilsson@outlook.com
                </p>
            </div>
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
.contact,
.api {
    margin-left: 0.2em;
    margin-top: 1em;
}
.about {
    grid-template-columns: 1fr;
}
.contact p {
    background-color: white;
    margin-top: 0.5em;
    overflow: auto;
}
.api p {
    background-color: #bedcd5;
}
.about-height {
    height: 5px;
}

@media screen and (min-width: 750px) {
    
    .omoss-title {
        position: fixed;
        margin-left: 170px;
        margin-top: 10px;
    }
    .absolute-left {
        margin-left: 170px;
    }
}
</style>
