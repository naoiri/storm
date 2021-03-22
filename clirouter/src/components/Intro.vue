<template>
    <div class="intro">
        <p>{{ msg }}</p>
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
