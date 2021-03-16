//This code will show all the fire Warnings in a Municipality

const BASE_URL = "https://opendata-download-warnings.smhi.se/api"

async function updateFireWarning() {
    const url = `${BASE_URL}/version/2/alerts.json`
    const response = await fetch(url)
    const alerts = await response.json()

    for (const eachAlert of alerts.alert) {
        if (eachAlert.info.event === "fire warning") {
            addFireWarning(eachAlert.info.headline, getTypeOfFireWarning(eachAlert.info.eventCode))
        }
    }
}

function addFireWarning(place, firewarning) {
    const placeDiv = document.createElement("div")
    const fireWarningDiv = document.createElement("div")
    //const timeDiv = document.createElement("div")
    placeDiv.innerText = place
    fireWarningDiv.innerText = firewarning
    //timeDiv.innerText = time

    const fireWarningContainer = document.getElementById("firewarning")
    fireWarningContainer.append(placeDiv)
    fireWarningContainer.append(fireWarningDiv)
    //fireWarningContainer.append(timeDiv)
}

//Checks if the alert is about fire warning
function eventIsFireWarning(info) {
    if (info.event === "fire warning") {
        return true
    }
    return false
}

function getTypeOfFireWarning(eventCode) {
    return eventCode[0].value
    //"Risk Grass Fire" or "Risk Forest Fire"
}

updateFireWarning()
