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
    const fireBallDiv1 = document.createElement("div")
    const fireBallDiv2 = document.createElement("div")

    placeDiv.innerText = place

    if (firewarning === 'Risk Grass fire') {
        fireBallDiv1.style.width = '20px'
        fireBallDiv1.style.height = '20px'
        fireBallDiv1.style.borderRadius = '50%'
        fireBallDiv1.style.background = 'red'
        fireBallDiv1.style.border = '1px solid black'
        fireBallDiv2.style.width = '20px'
        fireBallDiv2.style.height = '20px'
        fireBallDiv2.style.borderRadius = '50%'
        fireBallDiv2.style.border = '1px solid black'

    } else if (firewarning === 'Risk Forest fire') {

        fireBallDiv1.style.width = '20px'
        fireBallDiv1.style.height = '20px'
        fireBallDiv1.style.borderRadius = '50%'
        fireBallDiv1.style.background = 'red'
        fireBallDiv2.style.width = '20px'
        fireBallDiv2.style.height = '20px'
        fireBallDiv2.style.borderRadius = '50%'
        fireBallDiv2.style.background = 'red'
    } else {
        fireBallDiv1.innerText = "aaa"
        fireBallDiv2.innerText = "bbb"
            /*
            fireBallDiv1.style.width = '20px'
            fireBallDiv1.style.height = '20px'
            fireBallDiv1.style.borderRadius = '50%'
            fireBallDiv2.style.width = '20px'
            fireBallDiv2.style.height = '20px'
            fireBallDiv2.style.borderRadius = '50%'*/
    }



    const fireWarningContainer = document.getElementById("firewarning")
    fireWarningContainer.append(placeDiv)
    fireWarningContainer.append(fireBallDiv1)
    fireWarningContainer.append(fireBallDiv2)

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
        //"Risk Grass fire" or "Risk Forest fire"
}


updateFireWarning()