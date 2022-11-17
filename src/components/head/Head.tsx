import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../app/App.module.scss'

export function Heading(): JSX.Element {
  const navigate = useNavigate()
  return (
    <a href="#" className={style.heading} onClick={() => navigate('/')}>
      <img
        src={`${process.env.PUBLIC_URL}/quizlet.png`}
        alt="logo"
        className={style.logo}
      />
    </a>
  )
}
