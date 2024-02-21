// ==UserScript==
// @name      MÁV: accept terms and conditions
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/mav-aszf.user.js
// @match     https://jegy.mav.hu/dokumentumok-elfogadasa
// @match     https://jegy.mav.hu/dokumentumok-elfogadasa?*
// ==/UserScript==

const checkbox = document.querySelector("#ASZF");
if (!checkbox.checked)
    checkbox.click(); // accept terms and conditions
document.querySelector("button[type='submit']").click();
