import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { CustomRoutes } from '../../routes/modules'
import { fetchModules } from '../../store/app.thinks'
import { Heading } from '../head/Head'
import style from './App.module.scss'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchModules())
  }, [dispatch])

  return (
    <div className={style.app}>
      <Heading />
      <CustomRoutes />
    </div>
  )
}

export default App
