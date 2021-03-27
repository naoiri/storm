<template>
    <span class="autoComplete_wrapper">
        <input :id="autoid" type="text" autocomplete="off" :placeholder="msg" />
    </span>
</template>

<script>
import autoComplete from "@tarekraafat/autocomplete.js"
import "@tarekraafat/autocomplete.js/dist/css/autoComplete.01.css"

export default {
    name: "Search",
    props: {
        msg: String,
        autoid: String,
        list: Array,
    },
    data() {
        return {
            query: "",
        }
    },
    mounted() {
        //const interaction = this
        new autoComplete({
            data: {
                src: this.list,
            },
            onSelection: (feedback) => {
                document.getElementById(this.autoid).value = feedback.selection.value
                this.query = feedback.selection.value
                //interaction.updateData()
            },
        })
    },
}
</script>

<style>
.autoComplete_wrapper {
    width: 350px;
}
</style>
