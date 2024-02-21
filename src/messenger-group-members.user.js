// ==UserScript==
// @name             Messenger: quickly open group member profiles
// @description      Adds links to member profiles in the members list of a group chat
// @version          1.0
// @updateURL        https://raw.githubusercontent.com/floriensk/userscripts/main/src/messenger-group-members.user.js
// @match            https://www.messenger.com/*
// @match            https://messenger.com/*
// ==/UserScript==

function memberListOpened() {
    const intervalId = setInterval(addProfileLinks, 200);

    function addProfileLinks() {
        let members = document.querySelector("#scrollview + div div[role='tablist']");

        // if the members list is still loading, wait for a later check
        if (!members) {
            return;
        }

        // traverse up from the tab list
        do {
            members = members.parentElement;
        } while (members.children.length === 1);

        // select next div, whose descendant contains the members
        members = members.children[1];

        while (members) {
            // if an empty element is encountered, skip it
            if (members.children.length === 0) {
                members = members.nextElementSibling;
                continue;
            }

            // traverse down towards the member list
            members = members.firstChild;
            if (members.children.length === 1) {
                continue;
            }

            // detecting the members: if each child has the same list of classes,
            // they are likely the items in the member list
            if (members.firstChild.classList.length < 3) {
                continue;
            }

            const stringifyClasses = (element) => JSON.stringify(Array.from(element.classList).sort());
            const firstClasses = stringifyClasses(members.firstChild);
            if (Array.from(members.children).slice(1).every(e => stringifyClasses(e) === firstClasses)) {
                break;
            }
        }

        if (members) {
            clearInterval(intervalId); // stop consequent checks

            const children = Array.from(members.children);
            for (const c of children) {
                const profileId = c.querySelector("a[role='link']").href.match(/\/t\/(\d+)\//)?.[1];
                if (!profileId) {
                    continue;
                }
                const url = `https://facebook.com/${profileId}`;

                const a = document.createElement("a");
                a.appendChild(c);
                a.style.textDecoration = "none";
                a.href = url;

                members.appendChild(a);
            }

            console.log("User script: added links to member profiles in members list");
        }
    }
}

function attachMemberListOpenedEventHandler() {
    if (!document.querySelector("div[role='main'] a h1")) { // only run if a group is selected
        const titleLink = document.querySelector("div[role='main'] div[role='button']");
        if (!titleLink) {
            return false;
        }

        titleLink.addEventListener("click", memberListOpened);
    }

    return true;
}

const observeUrlChange = () => {
    let oldHref = null;

    const observer = new MutationObserver(() => {
        if (oldHref !== document.location.href && attachMemberListOpenedEventHandler()) {
            oldHref = document.location.href; // if attaching the event handler was successful, save current url
        }
    });

    observer.observe(document.querySelector("body"), { childList: true, subtree: true });
};

window.onload = observeUrlChange;
