// ==UserScript==
// @name      Facebook: page title
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/facebook-page-title.user.js
// @match     https://*.facebook.com/*
// ==/UserScript==

function updateTitle() {
    const titles = document.querySelectorAll("h1");
    const title = titles?.[1] ?? titles?.[0];

    if (title)
        document.title = title.textContent.trim() + " | Facebook";
}

window.onpopstate = updateTitle;
updateTitle();
