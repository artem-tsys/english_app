import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import App from 'src/pages/app'
import { appStore } from 'src/redux/app'

export const MemoryRouterPages = ({ path = '/' }) => (
  <Provider store={appStore}>
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  </Provider>
)
