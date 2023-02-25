import React, { useEffect } from 'react'
import { ErrorBoundary } from 'src/components/Generic/error-boundary/errorBoundary'
import { ModalManager } from 'src/components/shared/popups/answer-popup-factory'
import { useAppDispatch } from 'src/hooks/redux'
import { fetchModules } from 'src/redux/modules/modules.thinks'
import { RoutesPages } from 'src/routes/RoutesPages'
import style from 'src/styles/main.module.scss'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchModules())
  }, [])

  return (
    <ErrorBoundary>
      <div className={style.appContainer}>
        <RoutesPages />
        <ModalManager />
      </div>
    </ErrorBoundary>
  )
}
export default App
