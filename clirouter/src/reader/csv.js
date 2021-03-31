import d3 from "d3-fetch"

export default {
    methods: {
        async read() {
            d3.csv("@/db/metobs_sunshineTime_active_sites.csv").then(function (data) {
                console.log(data)
            })
        },
    },
}
