import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from 'src/components/shared/headers/Header'
import style from 'src/components/shared/headers/headers.module.scss'

export function HeaderWithLogo(): JSX.Element {
  const navigate = useNavigate()
  const clickLogoHandler = () => navigate('/')

  return (
    <Header>
      <a href="src/components/shared/headers/Header-with-logo#" className={style.logo} onClick={clickLogoHandler}>
        <img src={`${process.env.PUBLIC_URL}/quizlet.png`} alt="logo" className={style.image} />
      </a>
    </Header>
  )
}
