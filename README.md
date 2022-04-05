# Save and Load Form state to and from the URL

## API

```typescript
formToUrl(form: HTMLFormElement): void
```

Serialize form data to a search params string and push it to the URL without reloading the page (using the history API)

```typescript
urlToForm(form: HTMLFormElement): void
```

Parse the search params and set form values

```typescript
URLToClipboard(searchOnly?: boolean): Promise<void>
```

Write current url to clipboard  

`searchOnly`: When set to true, copy only the search parmas part of the url

## Demo

<https://tombigel.github.io/form-to-url-to-form/>

Forms are a great way to manage state for UI, their data is serializable and is fairly easy to deserialize it back to the form.  
We can push the entire form state to the url and create a savable state with very little code and no framework dependency.  
This demo shows a way to do it using `FormData`, `URLSearchParams`, `form.requestSubmit()` and `history.pushState`.  

The only external dependency is a polyfill for `form.requestSubmit()`.  
Safari's implementation is behind a flag for about a year now and there is no info on if and when it will be open by default (<https://bugs.webkit.org/show_bug.cgi?id=197958>).
