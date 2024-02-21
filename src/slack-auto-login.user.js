// ==UserScript==
// @name      Slack: auto-login, workspace autofill
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/slack-auto-login.user.js
// @match     https://app.slack.com/ssb/workspace-signin
// @match     https://app.slack.com/ssb/workspace-signin?*
// @match     https://*.slack.com/sign_in_with_password
// @match     https://*.slack.com/sign_in_with_password?*
// @require   Utils
// ==/UserScript==

initiateLogin(
    /*inputSpec:*/ "form input[id]",
    /*submitSpec*/ "button[type='submit']"
);
