<template>
    <div id="nav">
        <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
        <router-link to="/fire">Fire Warning</router-link>
    </div>
    <div>
        <div class="autoComplete_wrapper">
            <input id="autoComplete" type="text" autocomplete="off" />
        </div>
    </div>
    <router-view></router-view>
</template>
<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"
export default {
    name: "App",
    mounted() {
        new autoComplete({
            data: {
                src: ["apa", "bepa", "cepa"],
            },
            onSelection: (feedback) => {
                document.getElementById("autoComplete").value = feedback.selection.value
            },
        })
    },
}
</script>
