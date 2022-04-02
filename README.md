# Form state to URL

Forms are a great way to save state, their data is also serializable and is fairly easy to deserialize it back to the form, so we can push the entire form state to the url and create a savable state with very little code and no framework dependency.  

This demo shows it.
Only external dependency (which is eventually actually never used, but it's imp;ortant to know it is needed) is a polyfill for `form.requestSubmit()`.  
Apparently Safari's implementation is behind a flag and there is no info on where it will be open by default.

I created this as a Pen on CodePen.io. Original URL: [https://codepen.io/tombigel/pen/rNpYJKX](https://codepen.io/tombigel/pen/rNpYJKX).

but this code changes the URL search params so it can't work inside an iframe that has no control over the top window URL.  
I'm Keeping the code also in Codepen but for the demo purposes we need Github Pages.
