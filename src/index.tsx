import ReactDOM from 'react-dom/client'
import { initApp } from 'src/initApp'
import 'src/styles/index.css'
import 'src/styles/reset.scss'
import reportWebVitals from './reportWebVitals'

function init() {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  const app = initApp()
  root.render(app)
}
init()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
