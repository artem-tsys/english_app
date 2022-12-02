import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from 'src/components/headers/Header'
import style from './headers.module.scss'

export function HeaderWithLogo(): JSX.Element {
  const navigate = useNavigate()
  const clickLogoHandler = () => navigate('/')

  return (
    <Header>
      <a href="#" className={style.logo} onClick={clickLogoHandler}>
        <img src={`${process.env.PUBLIC_URL}/quizlet.png`} alt="logo" className={style.image} />
      </a>
    </Header>
  )
}
