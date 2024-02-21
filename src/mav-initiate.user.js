// ==UserScript==
// @name      MÁV: initiate login, set hungarian language
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/mav-initiate.user.js
// @match     https://jegy.mav.hu/*
// @match     https://jegy.mav.hu/*?*
// @require   Utils
// ==/UserScript==

const log = (message) => console.log("Userscript: MÁV: initiate login, set hungarian language\n" + message);
log("running")
// Set language to hungarian

waitForElementInDom("select[aria-label*='anguage'], select[aria-label*='yelv']") // without initials: case insensitive
    .then(languageSelect => {
        languageSelect.value = "hu";
        languageSelect.dispatchEvent(new Event('change')); // signal change to site
    });

// Initiate login
if (!["/bejelentkezes", "/dokumentumok-elfogadasa"].includes(window.location.pathname)) { // check if not already signing in / accepting documents before sing-in
    log("waiting for menu load")
    waitForElementInDom("app-header-profile button").then(() => { // wait until menu is loaded
        log("menu loaded")
        if (document.querySelector("app-header-profile button[aria-label*='Bejelentkezés']")) { // check if signed out
            log("redirecting to bejelentkezes")
            window.location.href = "/bejelentkezes";
        }
    });
} else log("on sign-in or document acceptance page; not redirecting")

// Focus end station input after start station is filled by autofill
log("waiting for start station input load")
waitForElementInDom("#startStation-input").then(startStationInput => { // wait until fields are loaded
    log("start station input loaded; waiting for autofill")

    function tryFocusEndStationInput() {
        log("waiting for end station input load")

        waitForElementInDom("#endStation-input").then(endStationInput => {
            log("end station input loaded; focusing")

            endStationInput.focus();
            endStationInput.dispatchEvent(new Event("mousedown", { bubbles: true })); // open dropdown
            endStationInput.select(); // select all text
        });
    }

    if (startStationInput.value) {
        tryFocusEndStationInput(); // if start station already filled by autofill, focus end station
    } else {
        new Promise(resolve => {
            function eventHandler() {
                startStationInput.removeEventListener("change", eventHandler);
                resolve();
            }

            startStationInput.addEventListener("change", eventHandler);
        }).then(tryFocusEndStationInput);
    }
});
