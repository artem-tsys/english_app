import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from 'src/styles/main.module.scss'

export function HeaderWithLogo(): JSX.Element {
  const navigate = useNavigate()
  const clickLogoHandler = () => navigate('/')

  return (
    <a href="#" className={style.header} onClick={clickLogoHandler}>
      <img
        src={`${process.env.PUBLIC_URL}/quizlet.png`}
        alt="logo"
        className={style.logo}
      />
    </a>
  )
}
