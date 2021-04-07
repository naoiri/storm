<template>
    <div class="links">
        <p>{{ msg }}</p>
        <div class="marginleft">
            <div><router-link to="/about">Om oss</router-link></div>
            <div><router-link to="/fire">Brandrisk</router-link></div>
            <div><router-link to="/ski">Skidväder</router-link></div>
            <div><router-link to="/compare">Ortjämförelse</router-link></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Links",
    props: {
        msg: String,
    },
}
</script>

<style>
.links {
    display: flex;
}
.marginleft {
    margin-left: 2em;
}
</style>
