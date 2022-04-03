// polyfill for form.requestSubmit in Safari, should be removed when the feature is enabled https://bugs.webkit.org/show_bug.cgi?id=197958
import formRequestSubmitPolyfill from "https://cdn.skypack.dev/pin/form-request-submit-polyfill@v2.0.0-szOipIemxchOslzcqvLN/mode=imports,min/optimized/form-request-submit-polyfill.js";

function formToURL(form) {
  const formData = new FormData(form);

  // Update URL without reloading
  if (history.pushState) {
    const url = new URL(window.location.href);
    url.search = new URLSearchParams(formData).toString();
    window.history.pushState({ path: url.href }, "", url.href);
  }
}

function URLToForm(form) {
  const urlParams = new URLSearchParams(window.location.search);
  const elements = [...form.elements];
  
  // Iterate over all form elements that are referenced in the url search params
  for (const element of elements) {
    // checkboxes are special, they are not set with value but with checked, and they are represented with a repeating key in the url
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#handling_multiple_checkboxes
    if (element.type === 'checkbox' || element.type === 'radio') {
      const values = urlParams.getAll(element.name);
      element.checked = values.includes(element.value);
    } else {
      if (urlParams.has(element.name)) {
        element.value = urlParams.get(element.name)
      }
    }
  }
}

function URLToClipboard() {
  // Returns a Promise
  return navigator.clipboard.writeText(location.href);
}

function init() {
  const form = document.forms[0];
  const link = document.getElementById("url-to-clipboard");
  const submitter = document.getElementById("submitter");

  // Update form from url params
  URLToForm(form);

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (window !== window.top) {
      document.getElementById("no-form-submit").show();
      return;
    }
    // Update url params from form
    formToURL(form);
  });

  link.addEventListener("click", event => {
    event.preventDefault();

    if (window !== window.top) {
      document.getElementById("no-form-submit").show();
      reutrn;
    }

    URLToClipboard().then(() => {
      event.target.querySelector("span").textContent = "(Copied!)";
    });
  });

  submitter.addEventListener("click", (event) => {
    event.preventDefault();
    form.requestSubmit()
  });
}

/**
 * Not really necesary, but reminds me of the good ol' days.
 */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}