import { useEffect, useRef, useState } from 'react'
import { formToUrl, urlToForm, urlToClipboard } from '../src/index'
import './App.css'

function App() {
  const formRef = useRef<HTMLFormElement>(null)
  const [copyNotification, setCopyNotification] = useState('')

  useEffect(() => {
    if (formRef.current) {
      urlToForm(formRef.current)
    }
  }, [])

  const handleSaveToUrl = () => {
    if (formRef.current) {
      formToUrl(formRef.current)
    }
  }

  const handleCopyToClipboard = async () => {
    await urlToClipboard()
    setCopyNotification('(Copied!)')
    setTimeout(() => {
      setCopyNotification('')
    }, 2000)
  }

  return (
    <div className="app">
      <h1>Form To URL To Form Demo</h1>

      <div className="description">
        <h2>Save Form State to URL Parameters</h2>
        <p><strong>What this library does:</strong> Form-to-URL-to-Form allows you to save form state directly to the URL, creating shareable links with form values embedded in the URL parameters.</p>
        <p><strong>Try it out:</strong> Change any values in the form below and click "Save to URL". Notice how the URL in your browser updates to include all form values. You can now share this URL with anyone, and when they open it, the form will be pre-filled with these exact values.</p>
        <p><strong>How it works:</strong> The library serializes form data to URL search parameters using the FormData and URLSearchParams APIs, and can restore form state from URL parameters without any server-side processing.</p>
      </div>

      <form ref={formRef} name="form" id="demo-form">
        <fieldset>
          <legend>Text Inputs</legend>
          <label>
            Text:
            <input type="text" name="text" defaultValue="Hello World" />
          </label>
          <label>
            Color:
            <input type="color" name="color" defaultValue="#4a87ee" />
          </label>
          <label>
            Date:
            <input type="date" name="date" />
          </label>
        </fieldset>

        <fieldset>
          <legend>Radio Options</legend>
          <label>
            <input type="radio" name="radio" value="1" defaultChecked /> One
          </label>
          <label>
            <input type="radio" name="radio" value="2" /> Two
          </label>
          <label>
            <input type="radio" name="radio" value="3" /> Three
          </label>
        </fieldset>

        <fieldset>
          <legend>Checkbox Options</legend>
          <label>
            <input type="checkbox" name="checkbox" value="1" defaultChecked /> One
          </label>
          <label>
            <input type="checkbox" name="checkbox" value="2" /> Two
          </label>
          <label>
            <input type="checkbox" name="checkbox" value="3" /> Three
          </label>
        </fieldset>

        <fieldset>
          <legend>Single Checkbox</legend>
          <label>
            <input type="checkbox" name="singleCheckbox" value="1" /> Agree to terms
          </label>
        </fieldset>

        <fieldset>
          <legend>Dropdown Selects</legend>
          <div className="select-container">
            <div>
              <label>
                Single Select:
                <select name="select" defaultValue="1">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Multi Select: (hold Ctrl/Cmd to select multiple)
                <select name="selectMulti" multiple defaultValue={["2"]}>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                </select>
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Range</legend>
          <label>
            Range:
            <input type="range" name="range" min="0" max="100" defaultValue="50" />
          </label>
        </fieldset>

        <input type="hidden" name="hidden" value="secret" />

        <div className="button-group">
          <button type="button" onClick={handleSaveToUrl}>Save to URL</button>
          <button type="button" onClick={handleCopyToClipboard}>
            Copy URL to clipboard <span aria-live="polite">{copyNotification}</span>
          </button>
        </div>
      </form>

      <footer className="footer">
        <div className="author">Created by <a href="https://github.com/tombigel">Tom Bigelajzen</a></div>
        <div className="links">
          <a href="https://github.com/tombigel/form-to-url-to-form">GitHub</a>
          <a href="https://www.npmjs.com/package/form-to-url-to-form">NPM</a>
        </div>
      </footer>
    </div>
  )
}

export default App
