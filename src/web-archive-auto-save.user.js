// ==UserScript==
// @name        Web Archive: auto save
// @description Skip the form asking whether error pages should also be saved
// @version     1.0
// @updateURL   https://raw.githubusercontent.com/floriensk/userscripts/main/src/web-archive-auto-save.user.js
// @match       https://web.archive.org/save
// @require     Utils
// ==/UserScript==

waitForElementInDom("#wm-error-pages #capture_all")
    .then(chkSaveErrors => {
        chkSaveErrors.checked = false;
    }).then(() => {
        if (!document.querySelector("#web-save-url-input").value)
            throw new Error("Userscript Web Archive: auto save:\nno URL was specified, aborting");

        document.querySelector("#web-save-form").submit();
    });
