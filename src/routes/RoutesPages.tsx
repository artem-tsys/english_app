import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CreateModule } from 'src/components/pages/create-module/create-module'
import { EditModule } from 'src/components/pages/edit-module/edit-module'
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
    path: '/create-module',
    component: CreateModule,
  },
  {
    path: '/module/:moduleId/edit-module',
    component: EditModule,
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

const renderRoute = ({ path, component: Component, nested }) => (
  <Route key={path} path={path} element={<Component />}>
    {nested && nested.map(renderRoute)}
  </Route>
)

export const RoutesPages = (): JSX.Element => <Routes>{routesList.map(renderRoute)}</Routes>
