import { formToUrl, urlToForm, urlToClipboard } from '../../src/index.ts';

function init() {
  const form = document.getElementById('demo-form');
  const clipboardLink = document.getElementById('url-to-clipboard');

  // First, update form from URL params if they exist
  urlToForm(form);

  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Save form state to URL
    formToUrl(form);
  });

  // Handle clipboard copy
  clipboardLink.addEventListener('click', (event) => {
    event.preventDefault();

    urlToClipboard().then(() => {
      const notification = clipboardLink.querySelector('span');
      notification.textContent = '(Copied!)';

      // Clear the notification after 2 seconds
      setTimeout(() => {
        notification.textContent = '';
      }, 2000);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
