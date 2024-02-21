// ==UserScript==
// @name     MÁV: auto-login
// @version  1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/mav-auto-login.user.js
// @match    https://jegy.mav.hu/bejelentkezes
// @match    https://jegy.mav.hu/bejelentkezes?*
// @require  Utils
// ==/UserScript==

waitForElementInDom("form button[type='submit']")
    .then(submit => initiateLogin(/*inputSpec*/ undefined, /*submitSpec*/ submit));
    