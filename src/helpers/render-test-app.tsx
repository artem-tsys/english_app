import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import App from 'src/pages/app'
import { createConfigureStore } from 'src/redux/app'

export const RenderTestApp = ({ path = '/', component = <App />, store = {} }) => (
  <Provider store={createConfigureStore(store)}>
    <MemoryRouter initialEntries={[path]}>{component}</MemoryRouter>
  </Provider>
)
