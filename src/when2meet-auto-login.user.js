// ==UserScript==
// @name      When2meet: auto-login
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/when2meet-auto-login.user.js
// @match     https://www.when2meet.com/?*
// @require   Utils
// ==/UserScript==

initiateLogin(/*inputSpec*/ ["#name", "#password"],
              /*submitSpec*/ "input[value='Sign In']");
