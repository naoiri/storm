<template>
    <nav class="menu-wrap small-screen">
        <input type="checkbox" class="toggler" />
        <div class="hamburger"><div></div></div>
        <div class="menu">
            <div>
                <div>
                    <ul>
                        <li><router-link to="/" @click="close">Start</router-link></li>
                        <li><router-link to="/about" @click="close">Om oss</router-link></li>
                        <li><router-link to="/fire" @click="close">Brandrisk</router-link></li>
                        <li><router-link to="/ski" @click="close">Skidväder</router-link></li>
                        <li><router-link to="/compare" @click="close">Ortjämförelse</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <nav class="big-screen">
        <router-link to="/" class="bs-menu">Start</router-link> |
        <router-link to="/about" class="bs-menu">Om oss</router-link> |
        <router-link to="/fire" class="bs-menu">Brandrisk</router-link> |
        <router-link to="/ski" class="bs-menu">Skidväder</router-link> |
        <router-link to="/compare" class="bs-menu">Ortjämförelse</router-link>
    </nav>
    <div class="showcase">
        <div class="container showcase-inner">
            <router-view></router-view>
        </div>
    </div>
    <nav class="big-screen footer">
        <router-link to="/" class="bs-menu">Start</router-link> |
        <router-link to="/about" class="bs-menu">Om oss</router-link> |
        <router-link to="/fire" class="bs-menu">Brandrisk</router-link> |
        <router-link to="/ski" class="bs-menu">Skidväder</router-link> |
        <router-link to="/compare" class="bs-menu">Ortjämförelse</router-link>
    </nav>
</template>
<script>
export default {
    name: "App",
    methods: {
        close() {
            document.querySelector(".menu-wrap input").checked = false
        },
    },
}
</script>
<style>
.showcase-inner > div {
    overflow: scroll;
}
.small-screen {
    display: block;
}
.big-screen {
    display: none;
    height: 70px;
}
.about,
.main,
.fire-main,
.maxwidth {
    width: 350px;
}

.bs-menu {
    font-size: xx-large;
}

/* medium, ipad etc */
@media screen and (min-width: 750px) {
    body {
        font-size: 20px;
    }
    .small-screen {
        display: none;
    }
    .big-screen {
        display: block;
    }
    .skiresortname {
        font-size: 30px;
    }
    .info {
        font-size: 70px;
    }

    .about,
    .main,
    .fire-main,
    .maxwidth {
        width: 750px;
    }
    .compare,
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
    .maxwidth {
        width: 1200px;
    }

    .home {
        width: 700px;
    }
}
</style>
