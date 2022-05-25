import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import './calendario/main.css'
// import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Auth0ProviderWithHistory } from './auth0/auth0-provider-with-history'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>
)
