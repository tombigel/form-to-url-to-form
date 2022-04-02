# Save and Load Form state to and from the URL

Forms are a great way to save state, their data is also serializable and is fairly easy to deserialize it back to the form, so we can push the entire form state to the url and create a savable state with very little code and no framework dependency.  
This demo shows it.  

The only external dependency (which is actually never used in the finished code, but it's important to know it is needed) is a polyfill for `form.requestSubmit()`.  
Safari's implementation is behind a flag for about a year now and there is no info on where it will be open by default (https://bugs.webkit.org/show_bug.cgi?id=197958).

I created this as a Pen on CodePen.io initially. Original URL: [https://codepen.io/tombigel/pen/rNpYJKX](https://codepen.io/tombigel/pen/rNpYJKX) but this code changes the URL search params so it can't work inside an iframe that has no control over the top window URL.  
I'm Keeping the code also in Codepen but for the demo purposes we need Github Pages.
