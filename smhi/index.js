//This code will show all the fire Wanrings 

const BASE_URL = "https://opendata-download-warnings.smhi.se/api";

const cities = [
    { name: "Göteborg", lng: 16.158, lat: 58.5812 },
    { name: "Helsingborg", lng: 12.68, lat: 56.04 },
    { name: "Jönköping", lng: 14.17, lat: 57.78 },
    { name: "Linköping", lng: 15.67, lat: 58.38 },
    { name: "Malmö", lng: 13.00073, lat: 55.60587 },
    { name: "Stockholm", lng: 18.0649, lat: 59.33258 },
    { name: "Uppsala", lng: 17.7, lat: 59.87 },
    { name: "Västerås", lng: 16.55, lat: 59.6 },
    { name: "Örebro", lng: 15.18, lat: 59.28 },
];

/*
Using information from the documentation at:
https://opendata.smhi.se/apidocs/metfcst/get-forecast.html
//今後10日間の予想天気

https://opendata.smhi.se/apidocs/metfcst/parameters.html
*/
async function updateFireWarning() {

    const url = `${BASE_URL}/version/2/alerts.json`;
    const response = await fetch(url);
    const alerts = await response.json();

    for (const eachAlert of alerts.alert) {
        if (eachAlert.info.event === "fire warning") {

            addFireWarning(eachAlert.info.headline, getTypeOfFireWarning(eachAlert.info.eventCode))
                /*
                console.log(eachAlert.info.headline)
                console.log(getTypeOfFireWarning(eachAlert.info.eventCode))
                */
        }
    }

}

function addFireWarning(place, time, firewarning) {
    const placeDiv = document.createElement("div");
    const fireWarningDiv = document.createElement("div");
    const timeDiv = document.createElement("div");
    placeDiv.innerText = place;
    fireWarningDiv.innerText = firewarning;
    timeDiv.innerText = time;

    const fireWarningContainer = document.getElementById("firewarning");
    fireWarningContainer.append(placeDiv);
    fireWarningContainer.append(fireWarningDiv);
    fireWarningContainer.append(timeDiv);
}


//Checks if the alert is about fire warning
function eventIsFireWarning(info) {
    if (info.event === "fire warning") {
        return true;
    }
    return false;
}

function getTypeOfFireWarning(eventCode) {
    return eventCode[0].value;
    //"Risk Grass Fire" or "Risk Forest Fire"

}

updateFireWarning();