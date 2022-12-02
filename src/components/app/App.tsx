import React, { useEffect } from 'react'
import { fetchModules } from 'src/redux/modules/modules.thinks'
import { RoutesPages } from 'src/routes/RoutesPages'
import { useAppDispatch } from '../../hooks/redux'
import style from './App.module.scss'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchModules())
  }, [])

  return (
    <div className={style.app}>
      <RoutesPages />
    </div>
  )
}

export default App
