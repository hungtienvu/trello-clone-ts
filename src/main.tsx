import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AppStateProvider } from './state/AppStateContext'
import { Footer } from "./AppComponentsStyles"

ReactDOM.render(
  <React.StrictMode>
      <Footer/>
      <AppStateProvider>
        <App />
      </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
