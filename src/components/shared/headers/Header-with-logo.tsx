import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from 'src/components/shared/headers/Header'
import style from 'src/components/shared/headers/headers.module.scss'
import { IHeaderProps } from 'src/types/header'

export const HeaderWithLogo: FC<IHeaderProps> = ({ className }) => {
  const navigate = useNavigate()
  const clickLogoHandler = () => navigate('/')

  return (
    <Header className={className}>
      <a href="#" className={style.logo} onClick={clickLogoHandler}>
        <img src={`${process.env.PUBLIC_URL}/quizlet.png`} alt="logo" className={style.image} />
      </a>
    </Header>
  )
}
