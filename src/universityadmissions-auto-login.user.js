// ==UserScript==
// @name      universityadmissions.se: auto-login
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/universityadmissions-auto-login.user.js
// @match     https://www.universityadmissions.se/*/login?*
// @match     https://www.universityadmissions.se/*/login
// @require   Utils
// ==/UserScript==

initiateLogin(/*inputSpec*/ ["#username", "#password"],
              /*submitSpec*/ "form#login button[type='submit']");
