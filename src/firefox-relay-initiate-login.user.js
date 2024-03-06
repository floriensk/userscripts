// ==UserScript==
// @name      Firefox Relay: initiate login
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/firefox-relay-initiate-login.user.js
// @match     https://relay.firefox.com/*
// ==/UserScript==

[...document.querySelectorAll("a")].find(a => a.innerText.toLowerCase() === "sign in")?.click();
