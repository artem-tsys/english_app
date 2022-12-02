import React from 'react'
import style from 'src/components/shared/buttons/buttons.module.scss'

interface IProps {
  handler: () => void
  text: string
}

export function BtnCreate({ handler, text }: IProps) {
  return (
    <button className={style.buttonCreate} onClick={handler} data-test-id="btn-create">
      {text}
    </button>
  )
}
