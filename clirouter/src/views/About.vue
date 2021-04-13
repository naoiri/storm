<template>
    <div class="about">
        <Title msg="Om oss" class="omoss-title" />
        <p class="strong absolute-left">
            <strong
                >Vi är en grupp Java och Ux studerande som har utvecklat den här appen tillsammans under 5
                veckor.</strong
            >
        </p>

        <div class="contact">
            <div>
                <p><strong>Mårten, Java</strong>, Email: <br />marten.hernebring@gmail.com</p>
                <p><strong>Naoya, Java</strong>, Email: <br />naoya.irikura@skola.goteborg.se</p>
                <p><strong>Suzana, Java</strong>, Email: <br />suztra0803@skola.goteborg.se</p>
                <p><strong>Jon, UX</strong>, Email: <br />jonkarlstrom@hotmail.com</p>
                <p><strong>Sandra, UX</strong>, Email: <br />sandra.125@live.se</p>
                <p><strong>Jenny, UX</strong>, Email: <br />jy.nilsson@outlook.com</p>
                <p><strong>Noa, UX</strong> , Email: <br />noalillskog@gmail.com</p>
            </div>
            <div class="api">
                <p>Version 1.2.0</p>
                <p>API1:https://opendata.smhi.se/apidocs/warnings/index.html</p>
                <p>API2A: https://opendata.smhi.se/apidocs/metfcst/get-forecast.html</p>
                <p>API2B: https://opendata.smhi.se/apidocs/metfcst/parameters.html</p>
                <p>API3: https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/</p>
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
        top: 75px;
        position: absolute;
        left: 75px;
    }
    .absolute-left {
        top: 200px;
        position: absolute;
        left: 75px;
        padding-top: 10px;
    }

    .contact {
        top: 250px;
        position: absolute;
        left: 75px;
        padding-bottom: 500px;
    }

    .footer {
        bottom: 0;
        position: fixed;
        background-color: white;
        height: 70px;
    }
    .api {
        bottom: 100px;
        position: absolute;
        left: 0px;
    }
}
</style>
