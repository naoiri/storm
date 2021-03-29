<template>
    <datepicker v-model="picked" :lowerLimit="from" />
    
</template>

<script>
import Datepicker from "vue3-datepicker"
import { ref } from "vue"

export default {
    name: "DatePicker",
    components: {
        Datepicker,
    },
    data() {
        return {
            picked: ref(new Date()),
            from: new Date("1991-01-01T03:24:00"),
        }
    },
}
</script>
