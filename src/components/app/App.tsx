import React, { useEffect } from 'react'
import { PopupManager } from 'src/components/shared/popups/answer-popup-factory'
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
      <PopupManager />
    </div>
  )
}

export default App
