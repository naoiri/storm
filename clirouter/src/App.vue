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
/*<body {
    background-color: #bedcd5;
    font: "Roboto", sans-serif;
    line-height: 1.4;
}
p {
    font-size: 14px;
    text-align: left;
}
.strong {
    font-weight: bold;
}*/
</style>
