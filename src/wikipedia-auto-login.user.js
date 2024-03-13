// ==UserScript==
// @name      Wikipedia: auto-login
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/wikipedia-auto-login.user.js
// @match     https://*.wikipedia.org/w/index.php?*title=Special:UserLogin*
// @require   Utils
// ==/UserScript==

waitForElementInDom("#wpRemember")
    .then(chkStayLoggedIn => {
        if (!chkStayLoggedIn.checked)
            performClick(chkStayLoggedIn);
    }).then(() =>
        initiateLogin(
            /*inputSpec:*/ ["input[autocomplete='username']", "input[type='password']"]
        )
    );
