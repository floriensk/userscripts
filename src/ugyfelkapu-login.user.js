// ==UserScript==
// @name      Ügyfélkapu: select login mode
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/ugyfelkapu-login.user.js
// @match     https://kau.gov.hu/proxy/saml/authservice
// @match     https://kau.gov.hu/proxy/saml/authservice?*
// @match     https://idp.gov.hu/idp/saml/authnrequest*
// @match     https://idp.gov.hu/idp/saml/authnrequest?*
// @require   Utils
// ==/UserScript==

// if on kau.gov.hu, choose to use Ügyfélkapu as a sign-in option
waitForElementInDom("#urn\\:eksz\\.gov\\.hu\\:1\\.0\\:azonositas\\:kau\\:1\\:uk\\:uidpwd")
    .then(form => form.submit());

// if on idp.gov.hu, auto-login
initiateLogin(
  /*inputSpec:*/ "form input[id]",
  /*submitSpec*/ "button[type='submit']"
);
