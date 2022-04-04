/**
 * Serialize form data to a search params string and push it to the URL without reloading the page (using the history API)
 * @param {HTMLFormElement} form
 */
export function formToURL(form) {
  const formData = new FormData(form);

  // Update URL without reloading
  if (history.pushState) {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams(formData).toString();
    window.history.pushState({ path: url.href }, "", url.href);
  }
}

/**
 * Parse the search params and set form values
 * @param {HTMLFormElement} form
 */
export function URLToForm(form) {
  const urlParams = new URLSearchParams(window.location.search);
  const elements = [...form.elements];

  // If no url params, reset the form to its defaults
  if ([...urlParams.entries()].length === 0) {
    form.reset();
    return;
  }
  // Iterate over all form elements that are referenced in the url search params
  for (const element of elements) {
    // checkboxes, radios and multiselect selects are special, they are not set with value but with checked/selected,
    // and they might multiple key representations in the url
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#handling_multiple_checkboxes
    if (urlParams.has(element.name)) {
      // Handle checkboxes and radios
      if (element.type === "checkbox" || element.type === "radio") {
        const values = urlParams.getAll(element.name);
        element.checked = values.includes(element.value);
      }
      // Handle multiselect
      else if (element.type === "select" && element.multiple) {
        const values = urlParams.getAll(element.name);
        [...element.querySelectorAll("option")].map(
          (option) => (option.selected = values.includes(option.value))
        );
      }
      // Handle all other form elements
      else {
        element.value = urlParams.get(element.name);
      }
    }
    // Radios and checkboxes which are not on the list and are checked by default should be deselected
    else if (
      (element.type === "checkbox" || element.type === "radio") &&
      element.checked
    ) {
      element.checked = false;
    }
  }
}

/**
 * Write current url to clipboard
 * @param {boolean?} searchOnly copy only the search parmas part of the url
 * @returns {Promise}
 */
export function URLToClipboard(searchOnly) {
  // Returns a Promise
  return navigator.clipboard.writeText(
    searchOnly ? location.search : location.href
  );
}
