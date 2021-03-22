<template>
    <div class="links">
        <p>{{ msg }}</p>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/about">About</router-link>
            </li>
            <li>
                <router-link to="/fire">Fire Warning</router-link>
            </li>
            <li>
                <router-link to="/ski">Ski</router-link>
            </li>
            <li>
                <router-link to="/compare">Compare</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
}
</script>
