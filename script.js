// polyfill for form.requestSubmit in Safari, should be removed when the feature is enabled https://bugs.webkit.org/show_bug.cgi?id=197958
import formRequestSubmitPolyfill from 'https://cdn.skypack.dev/pin/form-request-submit-polyfill@v2.0.0-szOipIemxchOslzcqvLN/mode=imports,min/optimized/form-request-submit-polyfill.js';
import { urlToForm, formToUrl, URLToClipboard } from './index.js';

function init() {
    const form = document.forms[0];
    const link = document.getElementById('url-to-clipboard');
    const submitter = document.getElementById('submitter');

    // Update form from url params
    urlToForm(form);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (window !== window.top) {
            document.getElementById('no-form-submit').show();
            return;
        }
        // Update url params from form
        formToUrl(form);
    });

    link.addEventListener('click', (event) => {
        event.preventDefault();

        if (window !== window.top) {
            document.getElementById('no-form-submit').show();
            reutrn;
        }

        URLToClipboard().then(() => {
            event.target.querySelector('span').textContent = '(Copied!)';
        });
    });

    submitter.addEventListener('click', (event) => {
        event.preventDefault();
        form.requestSubmit();
    });
}

/**
 * Not really necesary, but reminds me of the good ol' days.
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
