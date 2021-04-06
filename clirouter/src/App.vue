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
p {
    font-size: x-small;
    text-align: left;
}
.strong {
    font-weight: bold;
}
</style>
