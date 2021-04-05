<template>
    <div class="links">
        <p>{{ msg }}</p>
        <div><router-link to="/about">About</router-link></div>
        <div><router-link to="/fire">Fire Warning</router-link></div>
        <div><router-link to="/ski">Ski</router-link></div>
        <div><router-link to="/compare">Compare</router-link></div>
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
