import cities from "@/db/cities.js"

export default {
    data() {
        return {
            cities,
            query: "",
            parameter1: [],
            temperatureData: "",
        }
    },
    methods: {
        async updateData() {
            const response = await fetch(
                "https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/1/station/" +
                    this.getTemperatureId +
                    "/period/latest-months/data.json"
            )
            const json = await response.json()
            this.parameter1 = json.value
            this.temperatureData = this.parameter1[0].value
        },
    },
    computed: {
        getTemperatureId() {
            switch (this.query) {
                case "Stockholm":
                    return "98230"
                case "Göteborg":
                    return "71420"
                case "Malmö":
                    return "52350"
                case "Uppsala":
                    return "97510"
                case "Västerås":
                    return "96350"
                case "Örebro":
                    return "94190"
                case "Helsingborg":
                    return "62040"
                default:
                    return "00000"
            }
        },
    },
}
