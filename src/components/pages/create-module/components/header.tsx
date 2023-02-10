import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonSubmitForm } from 'src/components/pages/create-module/components/button-submit-form'
import style from 'src/components/pages/create-module/create-module.module.scss'
import { CloseButton } from 'src/components/shared/buttons/Close.button'

export const CreateModuleHeader = (): JSX.Element => {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
  }

  return (
    <header className={style.header}>
      <div className={style.buttonClose}>
        <CloseButton handleClick={handleClose} />
      </div>
      <h3 className={style.namePage} data-testid="page-title">
        Создать модуль
      </h3>
      <ButtonSubmitForm />
    </header>
  )
}
