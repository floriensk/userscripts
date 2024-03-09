// ==UserScript==
// @name      When2meet: 24-hour format
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/when2meet-24-hour-format.user.js
// @match     https://*.when2meet.com/*
// @require   Utils
// ==/UserScript==

function convertChildrenTo24Hour(parentDiv) {
    const allDivs = parentDiv.querySelectorAll("div:not(:has(*))"); // select all divs that don't have any children, just text content (i.e. the time slots)

    for (const div of allDivs) {
        const match = div.innerText.toUpperCase().match(/(?<hour>\d+):(?<minute>\d+)\s*(?<ampm>[AP]M)(?<other>.*)/);
        if (match == null)
            continue;

        const { hour, minute, ampm, other } = match.groups;
        const hour_int = parseInt(hour) % 12;
        const hour_24 = ampm === "PM" ? hour_int + 12 : hour_int;
        div.innerText = `${hour_24}:${minute}${other}`;
    }
}

waitForElementInDom("#YouGrid > div:not(.GridTitle)")
    .then(convertChildrenTo24Hour);

waitForElementInDom("#GroupGrid > div:not(.GridTitle)")
    .then(convertChildrenTo24Hour);
