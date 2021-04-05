<template>
    <nav>
        <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
        <router-link to="/fire">Brandrisk</router-link> | <router-link to="/ski">Ski</router-link> |
        <router-link to="/compare">Compare</router-link>
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
