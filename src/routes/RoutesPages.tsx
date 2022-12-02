import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from 'src/pages/home-page/Home.page'
import { MemorizationPage } from 'src/pages/memorization-exercise-page/Memorization.page'
import { ModulesPage } from 'src/pages/modules-page/Modules.page'
import { NotCreatedPage } from 'src/pages/not-created-page/NotCreatedPage'

interface IRoutes {
  path: string
  component: FC
  nested?: IRoutes[]
}

const routesList: IRoutes[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/module/:moduleId',
    component: ModulesPage,
  },
  {
    path: '/module/:moduleId/cards',
    component: NotCreatedPage,
  },
  {
    path: '/module/:moduleId/exercises',
    component: MemorizationPage,
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
