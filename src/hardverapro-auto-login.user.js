// ==UserScript==
// @name      Hardverapro: auto-login
// @version   1.0
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/hardverapro-auto-login.user.js
// @match     https://hardverapro.hu/*
// @require   Utils
// ==/UserScript==

waitForElementInDom("#login-options input[type='checkbox'][name='all']")
    .then(chkRemainSignedIn => { // check the "remain signed in" checkbox
        if (!chkRemainSignedIn.checked)
            performClick(chkRemainSignedIn);

        return chkRemainSignedIn.closest("form"); // get the form containing the checkbox
    }).then(form => // initiate login with the form
        initiateLogin(
            [...form.querySelectorAll("input[type='email'], input[type='password']")],
            form.querySelector("[type='submit']")
        )
    );

waitForElementInDom("input[name='trust']")
.then(chkTrustDevice => { // check the "trust this device" checkbox
    if (!chkTrustDevice.checked)
        performClick(chkTrustDevice);

    return chkTrustDevice.closest("form"); // get the form containing the checkbox
}).then(form => // initiate login with the form
    initiateLogin(
        [...form.querySelectorAll("input[type='text']")],
        form.querySelector(".btn-primary")
    )
);
