/**
 * Options for formToUrl function
 */
export interface FormToUrlOptions {
  /** Whether to replace the current history state instead of pushing a new one */
  replace?: boolean;
}

/**
 * Options for urlToClipboard function
 */
export interface UrlToClipboardOptions {
  /** When set to true, copy only the search params part of the url */
  searchOnly?: boolean;
}

/**
 * Serialize form data to a search params string and push it to the URL without reloading the page (using the history API)
 * @param form - The HTML form element to serialize
 * @param options - Options for controlling the behavior
 */
export function formToUrl(form: HTMLFormElement, options: FormToUrlOptions = {}): void {
  const { replace = false } = options;
  const formData = new FormData(form);

  const stateAction = replace ? 'replaceState' : 'pushState';
  // Update URL without reloading
  if (history[stateAction]) {
    const url = new URL(window.location.href);
    // Convert FormData to URLSearchParams
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });
    url.search = params.toString();
    history[stateAction]({ path: url.href }, '', url.href);
  } else {
    console.error('Your browser does not support the history.pushState API which is needed for changing the URL withot a page reload');
  }
}

/**
 * Parse the search params and set form values
 * @param form - The HTML form element to populate with URL values
 */
export function urlToForm(form: HTMLFormElement): void {
  const urlParams = new URLSearchParams(window.location.search);
  const elements = [...form.elements] as HTMLElement[];

  // If no url params, reset the form to its defaults
  if ([...urlParams.entries()].length === 0) {
    form.reset();
    return;
  }

  // Iterate over all form elements that are referenced in the url search params
  for (const element of elements) {
    const formElement = element as HTMLInputElement | HTMLSelectElement;
    if (!formElement.name) continue;

    if (urlParams.has(formElement.name)) {
      // Multiple value elements are special, they are represented in the search params with multiple appearences
      // Also, they are not set by value in the form but by 'checked'/'selected' attributes
      //
      // Check checkboxes and radios that are in the search params
      if (formElement.type === 'checkbox' || formElement.type === 'radio') {
        const values = urlParams.getAll(formElement.name);
        (formElement as HTMLInputElement).checked = values.includes(formElement.value);
      }
      // Handle multiselect select boxes
      else if (formElement.type === 'select-multiple') {
        const values = urlParams.getAll(formElement.name);
        [...(formElement as HTMLSelectElement).querySelectorAll('option')].forEach(
          (option) => (option.selected = values.includes(option.value))
        );
      }
      // Handle all other form elements by value
      else {
        formElement.value = urlParams.get(formElement.name) || '';
      }
    }
    // Uncheck checkboxes and radios that are not in the search params
    else if ((formElement.type === 'checkbox' || (formElement.type === 'radio'))
             && (formElement as HTMLInputElement).checked) {
      // For radio buttons, we need special handling for named groups
      if (formElement.type === 'radio') {
        const radioGroup = form.elements.namedItem(formElement.name);
        // Only uncheck if the radio is not part of a group or its value is not in URL params
        if (radioGroup && 'length' in radioGroup) {
          // It's a RadioNodeList
          if (!urlParams.has(formElement.name)) {
            (formElement as HTMLInputElement).checked = false;
          }
        } else {
          // It's a single radio button
          (formElement as HTMLInputElement).checked = false;
        }
      } else {
        // For checkboxes, simply uncheck
        (formElement as HTMLInputElement).checked = false;
      }
    }
  }
}

/**
 * Write current url to clipboard
 * @param options - Options for controlling what part of the URL to copy
 * @returns Promise that resolves when the URL has been copied
 */
export function urlToClipboard(options: UrlToClipboardOptions = {}): Promise<void> {
  const { searchOnly = false } = options;
  return navigator.clipboard.writeText(searchOnly ? location.search : location.href);
}
