<template>
    <div class="about">
        <Title msg="Om oss" />
        <p>
            <strong
                >Vi är en grupp Java och Ux studerande som har utvecklat den här appen tillsammans under 5
                veckor.</strong
            >
        </p>
        <p>Version 1.2.0"</p>

        <p>API1:https://opendata.smhi.se/apidocs/warnings/index.html</p>
        <p>API2A: https://opendata.smhi.se/apidocs/metfcst/get-forecast.html</p>
        <p>API2B: https://opendata.smhi.se/apidocs/metfcst/parameters.html</p>
        <p>API3: "https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/"</p>
        <div class="contact">
            <p>Mårten, Java, Email: marten.hernebring@gmail.com</p>
            <p>Naoya, Java, Email: naoya.irikura@skola.goteborg.se</p>
            <p>Suzana, Java, Email: suztra0803@skola.goteborg.se</p>
            <p>
                Jon, studerar Ux-design på Yrgo, har pluggat systemvetenskap och psykologi sedan innan. Största
                intressen är matlagning och musik. När Sverige inte bjuder på permafrost gillar Jon att vara ute i
                naturen, paddla kajak och vandra.<br />
                Email: jonkarlstrom@hotmail.com
            </p>
            <p>
                Sandra, studerar UX-design på Yrgo. Har de senaste 6 åren jobbat inom produktion och främst i projekt
                för att utveckla produktion av nya produkter, så som bioreaktorer och litsiumjonbatterier. Sandra åker
                helst på långa resor till varmare breddgrader med fina vågor för surfing eller höga berg att klättra på.
                Har även en teknisk gymnasieutbildning och en salig blandning av universitetskurser i bagaget.<br />
                Email: sandra.125@live.se
            </p>
            <p>
                Noa, studerar UX-design just nu och har hållit på med lite olika grejer innan. Har jobbat på
                landvetterflygplats och lite lätt som föreskolevikarie. Har sedan tidigare en Tekniskt gymnasie
                utbildning på Hulebäck. <br />
                Email: noalillskog@gmail.com
            </p>
            <p>
                Jenny Studerar UX-design på Yrgo. Har de senaste 6 åren jobbat inom produktion och främst i projekt för
                att utveckla produktion av nya produkter, så som bioreaktorer och litsiumjonbatterier. Sandra åker helst
                på långa resor till varmare breddgrader med fina vågor för surfing eller höga berg att klättra på. Har
                även en teknisk gymnasieutbildning och en salig blandning av universitetskurser i bagaget. <br />Email:
                jy.nilsson@outlook.comç
            </p>
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
    background-color: blue;
}

.about {
    width: 310px;
    overflow: scroll;
}
.contact p {
    padding: 0.25em;
}
.about-height {
    height: 2px;
}
</style>
