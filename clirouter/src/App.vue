<template>
    <nav>
        <router-link to="/">Start</router-link> | <router-link to="/about">Om oss</router-link> |
        <router-link to="/fire">Brandrisk</router-link> | <router-link to="/ski">Skidväder</router-link> |
        <router-link to="/compare">Ortjämförelse</router-link>
    </nav>
    <router-view></router-view>
</template>
<style>
body {
    background-color: #bedcd5;
    font: "Roboto", sans-serif;
    /*line-height: 1.4;*/
}
p,
div {
    font-size: 14px;
    text-align: left;
}
.strong {
    font-weight: bold;
}

/* medium, ipad etc */
@media screen and (min-width: 750px) {
    body {
        font-size: 20px;
    }
    .skiresortname {
        font-size: 30px;
    }
    .about,
    .main,
    .fire-main,
    .home,
    .maxwidth {
        width: 350px;
    }
    .compare,
    .home,
    .about,
    .fire-main {
        display: flex;
    }

    .fire-main {
        flex-direction: row;
    }
}

/* large, desktop */
@media screen and (min-width: 1000px) {
    body {
        font-size: 30px;
    }
    .skiresortname {
        font-size: 50px;
    }
    .about,
    .main,
    .fire-main,
    .home,
    .maxwidth {
        width: 400px;
    }
}
</style>
