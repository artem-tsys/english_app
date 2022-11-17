import React from 'react'
import style from './btn-create.module.scss'

interface IProps {
  handler: () => void
  text: string
}

export function BtnCreate({ handler, text }: IProps) {
  return (
    <button
      className={style.btnCreate}
      onClick={handler}
      data-test-id="btn-create"
    >
      {text}
    </button>
  )
}
