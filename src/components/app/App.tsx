import React from 'react'
import style from './App.module.scss'
import { IHandleSubmit } from '../../../models'

const handler: IHandleSubmit<any> = (data) => {
  // eslint-disable-next-line no-console
  console.log(data)
}
function App() {
  return (
    <div className={style.app}>
      test
      <button onClick={handler}>button</button>
    </div>
  )
}

export default App
