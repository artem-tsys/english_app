import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/home-page/Home'
import { Modules } from '../pages/modules-page/Modules'
import { NotCreated } from '../pages/not-created-page/NotCreated'

const routesList = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/module',
    component: Modules,
  },
  {
    path: '/createModule',
    component: NotCreated,
  },
]

export const CustomRoutes = (): JSX.Element => (
  <Routes>
    {routesList.map(({ path, component: Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
)
