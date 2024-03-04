// ==UserScript==
// @name      Facebook: clickable profile picture
// @version   1.1
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/facebook-clickable-profile-picture.user.js
// @match     https://www.facebook.com/*
// @require   Utils
// ==/UserScript==

function makeProfilePictureClickable(profilePicture) {
    if (!profilePicture.closest("a")) { // if profile picture is not clickable, wrap it in a link
        const wrapperLink = document.createElement("a");
        wrapperLink.href = profilePicture.getAttribute("xlink:href");
        wrapperLink.target = "_blank";

        const svg = profilePicture.closest("svg");
        svg.parentElement.insertBefore(wrapperLink, svg);
        wrapperLink.appendChild(svg);
    }
}

function waitForProfilePicture() {
    waitForElementInDom("g circle")
        .then(() => {
            const profilePicture = getElements("g circle")
                .filter(c => c.getAttribute("r") > 45)
                .map(c => c.parentElement.querySelector("image"))
                .find(i => i);

            if (profilePicture)
                makeProfilePictureClickable(profilePicture);
            else
                waitForProfilePicture(); // if profile picture is not found, wait
        });
}

waitForProfilePicture();
