import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CloseButton } from 'src/components/shared/buttons/Close.button'
import ButtonSubmit from 'src/components/shared/modules/components/button-submit'
import style from './header.module.scss'

export const ModuleHeader: FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
  }

  return (
    <header className={style.header}>
      <div className={style.buttonClose}>
        <CloseButton handleClick={handleClose} />
      </div>
      <h3 className={style.title} data-testid="page-title">
        {title}
      </h3>
      <ButtonSubmit />
    </header>
  )
}
