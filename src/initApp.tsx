import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/pages/app'
import { appStore } from 'src/redux/app'

export const initApp = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={appStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
