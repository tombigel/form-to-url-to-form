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

  // Iterate over all form elements that are referenced in the url search params
  for (const [key, value] of urlParams.entries()) {
    if (form.elements[key]) {
      form.elements[key].value = value;
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
  // Update form from url params
  URLToForm(form);

  form.addEventListener("submit", event => {
    if (window !== window.top) {
      document.getElementById("no-form-submit").show();
    } else {
      // Update url params fro form
      formToURL(form);
    }

    event.preventDefault();
  });

  link.addEventListener("click", event => {
    if (window !== window.top) {
      document.getElementById("no-form-submit").show();
    } else {
      URLToClipboard().then(() => {
        event.target.querySelector("span").textContent = "(Copied!)";
      });
    }

    event.preventDefault();
  });
}

init();