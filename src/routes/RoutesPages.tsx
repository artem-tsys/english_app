import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotCreatedPage } from 'src/pages/not-created-page/NotCreatedPage'
import { Home } from '../pages/home-page/Home'
import { ModulesPage } from '../pages/modules-page/Modules'

const routesList = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/module/:moduleId',
    component: ModulesPage,
  },
  {
    path: '/createModule',
    component: NotCreatedPage,
  },
]

export const RoutesPages = (): JSX.Element => (
  <Routes>
    {routesList.map(({ path, component: Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
)
