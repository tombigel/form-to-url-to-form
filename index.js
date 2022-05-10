/**
 * Serialize form data to a search params string and push it to the URL without reloading the page (using the history API)
 * @param {HTMLFormElement} form
 */
export function formToUrl(form, {replace = false} = {}) {
    const formData = new FormData(form);

    const stateAction = replace ? 'replaceState' : 'pushState';
    // Update URL without reloading
    if (history[stateAction]) {
        const url = new URL(window.location.href);
        url.search = new URLSearchParams(formData).toString();
        history[stateAction]({ path: url.href }, '', url.href);
    } else {
        console.error('Your browser does not support the history.pushState API which is needed for changing the URL withot a page reload')
    }
}

/**
 * Parse the search params and set form values
 * @param {HTMLFormElement} form
 */
export function urlToForm(form) {
    const urlParams = new URLSearchParams(window.location.search);
    const elements = [...form.elements];

    // If no url params, reset the form to its defaults
    if ([...urlParams.entries()].length === 0) {
        form.reset();
        return;
    }
    // Iterate over all form elements that are referenced in the url search params
    for (const element of elements) {
        if (urlParams.has(element.name)) {
            // Multiple value elements are special, they are represented in the search params with multiple appearences
            // Also, they are not set by value in the form but by 'cehcked'/'selected' attributes
            //
            // Check checkboxes and radios that are in the search params
            if (element.type === 'checkbox' || element.type === 'radio') {
                const values = urlParams.getAll(element.name);
                element.checked = values.includes(element.value);
            }
            // Handle multiselect select boxes
            else if (element.type === 'select-multiple') {
                const values = urlParams.getAll(element.name);
                [...element.querySelectorAll('option')].map(
                    (option) => (option.selected = values.includes(option.value))
                );
            }
            // Handle all other form elements by value
            else {
                element.value = urlParams.get(element.name);
            }
        }
        // Uncheck checkboxes and radios that are not in the search params
        else if ((element.type === 'checkbox' || (element.type === 'radio' && !form.elements[element.name].length)) && element.checked) {
            element.checked = false;
        }
    }
}

/**
 * Write current url to clipboard
 * @param {boolean?} searchOnly copy only the search parmas part of the url
 * @returns {Promise<void>}
 */
export function urlToClipboard({ searchOnly } = {}) {
    return navigator.clipboard.writeText(searchOnly ? location.search : location.href);
}
