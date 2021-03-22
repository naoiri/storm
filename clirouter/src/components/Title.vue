<template>
    <div class="intro">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
export default {
    name: "Intro",
    props: {
        msg: String,
    },
}
</script>
