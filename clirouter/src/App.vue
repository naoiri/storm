<template>
    <nav class="menu-wrap">
        <input type="checkbox" class="toggler" />
        <div class="hamburger"><div></div></div>
        <div class="menu">
            <div>
                <div>
                    <ul>
                        <li><router-link to="/">Start</router-link></li>
                        <li><router-link to="/about">Om oss</router-link></li>
                        <li><router-link to="/fire">Brandrisk</router-link></li>
                        <li><router-link to="/ski">Skidväder</router-link></li>
                        <li><router-link to="/compare">Ortjämförelse</router-link></li>
                    </ul>
                </div>
            </div>
        </div>

        <!--<router-link to="/">Start</router-link> | <router-link to="/about">Om oss</router-link> |
        <router-link to="/fire">Brandrisk</router-link> | <router-link to="/ski">Skidväder</router-link> |
        <router-link to="/compare">Ortjämförelse</router-link>-->
    </nav>
    <div class="showcase">
        <div class="container showcase-inner">
            <router-view></router-view>
        </div>
    </div>
</template>
<style>
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
    .maxwidth {
        width: 350px;
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
        width: 400px;
    }

    .home {
        width: 700px;
    }
}
</style>
