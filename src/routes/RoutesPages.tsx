import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateModule } from 'src/components/pages/create-module/create-module'
import { HomePage } from 'src/pages/home'
import { MemorizationPage } from 'src/pages/memorization'
import { ModulesPage } from 'src/pages/modules'
import { NotCreatedPage } from 'src/pages/notCreated'
import { NotFoundPage } from 'src/pages/notFound'

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
    path: '/module/:moduleId/memorization',
    component: MemorizationPage,
  },
  {
    path: '/createModule',
    component: CreateModule,
  },
  {
    path: '/notCreated',
    component: NotCreatedPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
]

export const RoutesPages = (): JSX.Element => (
  <Routes>
    {routesList.map(({ path, component: Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
)
