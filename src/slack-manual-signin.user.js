// ==UserScript==
// @name      Slack: choose manual sign-in
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/slack-manual-signin.user.js
// @match     https://app.slack.com/ssb/signin
// @match     https://app.slack.com/ssb/signin?*
// @match     https://*.slack.com/?*is_ssb_browser_signin=1*
// ==/UserScript==

const manualSignInLinks = document.querySelectorAll(
    "div[class*='manual'][class*='sign'] a, " + // on URLs app.slack.com, to select manual sign-in (where domain is manually specified)
    "div[class*='manual'][class*='login'] a" // on URLs [domain].slack.com, to select password-based login (instead of link via email)
);

if (manualSignInLinks.length === 0)
    alert("Userscript: no link for manual, password-based sign-in found");
else if (manualSignInLinks.length > 1)
    alert("Userscript: link for manual, password-based sign-in is ambiguous");

manualSignInLinks[0].click();
