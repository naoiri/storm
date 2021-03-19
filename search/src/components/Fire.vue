<template>
    <div class="fire">
        <h1>{{ msg }}</h1>
        <div id="firewarning"></div>
    </div>
</template>

<script>
export default {
    name: "Fire",
    props: {
        msg: String,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#firewarning {
    border: 2px solid gray;
    display: grid;
    grid-template-columns: 4fr 1fr;
    padding: 1rem;
    width: 600px;
}
</style>
