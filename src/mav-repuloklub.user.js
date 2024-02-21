// ==UserScript==
// @name      MÁV repülőklub: auto-login
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/mav-repuloklub.user.js
// @match     https://mavrepuloklub.hu/*
// @match     https://mavrepuloklub.hu/*?*
// @require   Utils
// ==/UserScript==

if (document.getElementById("userusername")) {
    initiateLogin(/*inputSpec:*/["#userusername", "#userpassword"], /*submitSpec*/ "input[type='submit']")
        .catch(e => console.log(e));

    document.getElementById("mojo-sp-left-button").click(); // open login sidebar
}
