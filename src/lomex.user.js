// ==UserScript==
// @name      lomex.hu: prevent automatic logout
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/lomex.user.js
// @match     https://lomex.hu/*
// ==/UserScript==

const chk = document.getElementById("autologout");
if (chk.checked)
    chk.click(); // only "click" event is used by lomex.hu

chk.style.display = "none";
chk.nextElementSibling.style.display = "none";
document.getElementById("autologout_help").style.display = "none";
