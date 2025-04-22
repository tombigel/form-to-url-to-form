import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Add dark mode class if system prefers dark mode
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const setDarkMode = (e: MediaQueryListEvent | MediaQueryList) => {
  if (e.matches) {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
};

// Initial check
setDarkMode(darkModeMediaQuery);

// Listen for changes
darkModeMediaQuery.addEventListener('change', setDarkMode);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
