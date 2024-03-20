// ==UserScript==
// @name        Messenger: help set emoji reactions
// @description Helps set default emoji reactions by removing all other emojis from the emoji picker and placing the selected emojis in one row in order. The reactions customiser has to be manually opened.
// @version     1.0
// @updateURL   https://raw.githubusercontent.com/floriensk/userscripts/main/src/messenger-help-set-emoji-reactions.user.js
// @match       https://www.messenger.com/*
// @require     Utils
// ==/UserScript==

const emojis = ["👍", "☺️", "😄", "🥰", "😮", "😥"];

function findEmojis(emojiPicker) {
    const foundEmojiElements = [];

    // Iterate over emoji groups
    for (const emojiGroup of emojiPicker.querySelectorAll("div[role='rowgroup']")) {
        let retainGroup = false;

        // Iterate over emoji rows in the group
        for (const emojiRow of emojiGroup?.querySelectorAll("div[role='row']")) {
            let retainRow = false;

            // Iterate over emojis in the row
            for (const emojiElement of emojiRow?.querySelectorAll("div[role='gridcell']")) {
                if (emojis.includes(emojiElement.querySelector("img").alt)) {
                    retainGroup = retainRow = true;
                    foundEmojiElements.push(emojiElement);
                } else
                    emojiElement.remove();
            }

            if (!retainRow)
                emojiRow.remove();

            if (foundEmojiElements.length === emojis.length)
                break;
        }

        if (!retainGroup)
            emojiGroup.remove();

        if (foundEmojiElements.length === emojis.length)
            break;
    }

    return foundEmojiElements;
}

new Promise(resolve => setTimeout(() => resolve(), 5000))
    .then(() => waitForElementInDom("div[aria-label='Customize Reactions'] div[aria-label='Emoji picker']"))
    .then(emojiPicker => new Promise(resolve => {
        let foundEmojiElements = findEmojis(emojiPicker);

        // If not all emojis were found, scroll the emoji picker to the bottom to make more emojis load
        if (foundEmojiElements.length === emojis.length) {
            resolve(foundEmojiElements);
            return;
        }

        // Find scrollable parent of emoji picker
        let scrollParent = emojiPicker;
        while (scrollParent.scrollHeight === scrollParent.clientHeight)
            scrollParent = scrollParent.parentElement;

        // Scroll to the bottom
        scrollParent.scrollTop = scrollParent.scrollHeight;

        // Wait for the scroll to finish, then try again
        const observer = new MutationObserver(mutationsList => {
            if (mutationsList.some(m => m.type === "childList" && m.addedNodes.length > 0)) {
                foundEmojiElements = findEmojis(emojiPicker);

                if (foundEmojiElements.length === emojis.length) {
                    observer.disconnect();
                    scrollParent.scrollTop = 0;

                    resolve(foundEmojiElements);
                }
            }
        });
        observer.observe(emojiPicker, { childList: true, subtree: true });
    })).then(foundEmojiElements => {
        // If all emojis were found, place them in one row in order, if they are not too many
        const rowLength = 8;
        if (foundEmojiElements.length === emojis.length && emojis.length <= rowLength) {
            const orderedEmojiElements = foundEmojiElements.sort((a, b) => emojis.indexOf(a.querySelector("img").alt) - emojis.indexOf(b.querySelector("img").alt));

            for (const emojiElement of orderedEmojiElements.slice(1)) {
                const previousRow = emojiElement.parentElement;

                foundEmojiElements[0].parentElement.appendChild(emojiElement);

                if (previousRow.children.length === 0)
                    previousRow.remove();
            }
        }
    });
