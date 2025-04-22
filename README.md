# Form To URL To Form

Save and load form state to and from the URL. Perfect for creating sharable form states without server-side persistence.

[Try the Demo](https://tombigel.github.io/form-to-url-to-form/)

## Installation

```bash
npm install form-to-url-to-form
```

## Features

- Serialize form data to URL search parameters
- Restore form data from URL search parameters
- Copy the URL to clipboard for sharing
- Supports all standard form controls:
  - Text inputs
  - Checkboxes
  - Radio buttons
  - Select boxes (including multi-select)
  - Range sliders
  - Hidden fields
- No dependencies
- TypeScript support
- Small footprint (~1.6KB)

## API

```typescript
formToUrl(form: HTMLFormElement, options?: FormToUrlOptions): void
```

Serialize form data to a search params string and push it to the URL without reloading the page (using the history API)

Options:

- `replace?: boolean` - When set to true, replace the current history state instead of pushing a new one (default: false)

```typescript
urlToForm(form: HTMLFormElement): void
```

Parse the search params and set form values

```typescript
urlToClipboard(options?: UrlToClipboardOptions): Promise<void>
```

Write current URL to clipboard  

## How It Works

Forms are a great way to manage state for UI, their data is serializable and fairly easy to deserialize back to the form.  

We can push the entire form state to the URL and create a savable state with very little code and no framework dependency.  

This library provides a simple way to do this using `FormData`, `URLSearchParams`, and the history API.

## Links

- [GitHub Repository](https://github.com/tombigel/form-to-url-to-form)
- [npm Package](https://www.npmjs.com/package/form-to-url-to-form)
- [Author: Tom Bigelajzen](https://github.com/tombigel)
