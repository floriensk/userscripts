// ==UserScript==
// @name      Kamara (MKIK): auto-login
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/kamara-mkik-auto-login.user.js
// @match     https://knyr.mkik.hu/Kamreg/Vallalkozasok/Adatok
// @require   Utils
// ==/UserScript==

initiateLogin(
    /*inputSpec:*/ "#Adoszam",
    /*submitSpec*/ "button.k-primary[type='button']"
);
