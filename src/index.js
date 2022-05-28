import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'

import './calendario/main.css'
// import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Auth0ProviderWithHistory } from './auth0/auth0-provider-with-history'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <MuiPickersUtilsProvider utils = { DateFnsUtils } locale = { esLocale } >
        <App />
      </MuiPickersUtilsProvider>
    </Auth0ProviderWithHistory>
  </BrowserRouter>
)
