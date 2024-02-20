// ==UserScript==
// @name      Auto-login
// @version   1.1
// @updateURL https://raw.githubusercontent.com/floriensk/userscripts/main/src/utils.user.js
// ==/UserScript==

const getElement = (spec) =>
  typeof spec === "string" ? document.querySelector(spec) : spec;
const getElements = (spec) =>
  typeof spec === "string" ? [...document.querySelectorAll(spec)] : spec;

const performClick = (element) => { element.click(); };

/**
 * Initiates the log-in process by clicking a specified submit element, when all specified input elements are filled.
 *
 * @param {[string] | [HTMLElement] | string | HTMLElement} inputSpec:
 *     the query selector(s) matching the input elements or the input element(s) themselves.
 * @param {string | HTMLElement} submitSpec: the query selector matching the submit element or the submit element itself.
 * @param {bool} tryInferManualInput: whether to fail if it is suspected that a user is manually typing into a field,
 *     instead of being filled by a password manager.
 * @param {undefined | number} minimalRequiredInputMatches: the minimal number of input elements that needs to be successfully matched
 *     from inputSpec. If undefined, all need to be matched.
 */
async function initiateLogin(
  inputSpec = "form input[id], form input[type='password'], form input[type='email']",
  submitSpec = "form button[type='submit'], form input[type='submit']",
  tryInferManualInput = true,
  minimalRequiredInputMatches = undefined
) {
  // Find inputs and submit
  const inputs = Array.isArray(inputSpec)
        ? inputSpec.map(spec => getElement(spec))
        : getElements(inputSpec);

  if (minimalRequiredInputMatches <= 0)
    throw new Error("minimalRequiredInputMatches cannot be zero or negative");

  if (minimalRequiredInputMatches == null
      ? inputs.some(i => i == null)
      : inputs.filter(i => i != null).length < minimalRequiredInputMatches
     ) {
    console.log("Userscript Auto-login: inputs not found");
    throw new Error("Userscript Auto-login: inputs not found");
  }

  const submit = getElement(submitSpec);
  if (submit == null) {
    console.log("Userscript Auto-login: submit not found");
    throw new Error("Userscript Auto-login: submit not found");
  }

  // Subscribe to input changes
  async function subscribeToInput(input) {
    // check if input is already filled
    if (input.value.length > 0) {
      if (tryInferManualInput || input.value.length > 1)
        return Promise.resolve(input.value);
      else
        return Promise.reject(new Error("Userscript Auto-login: manual input detected"));
    }

    return new Promise((resolve, reject) => {
      function handleInput(event) {
        event.target.removeEventListener("input", handleInput);

        if (tryInferManualInput && event.target.value.length === 1)
          reject(new Error("Userscript Auto-login: manual input detected"));
        else
          resolve(event.target.value); // resolve promise with the current value
      }

      input.addEventListener("input", handleInput); // subscribe to the input event
    });
  }

  const inputPromises = inputs.map(input => subscribeToInput(input));

  return Promise.all(inputPromises).then(
    () => performClick(submit));
}

/**
 * Waits for an element matching the specified selector to appear in the DOM.
 *
 * @param {string} selector: the query selector that matches the element.
 * @param {HTMLElement} parent: the DOM element to check the descendants of.
 * @param {bool} subtree: whether to look in the whole subtree instead of only the children.
 */
async function waitForElementInDom(selector, parent = document.body, subtree = true) {
  // check if element is already in the DOM
  const element = document.querySelector(selector);
  if (element != null)
      return element;

  // using MutationObserver instead of DOMNodeInserted because the latter is deprecated
  return new Promise((resolve, _) => {
    const observer = new MutationObserver((_, observer) => {
    const element = document.querySelector(selector);
    if (element != null) {
      observer.disconnect();
      resolve(element);
    }
    });
    observer.observe(parent, { childList: true, subtree });
  });
}
