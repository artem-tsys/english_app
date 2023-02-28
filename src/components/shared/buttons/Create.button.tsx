import React, { FC } from 'react'
import style from 'src/components/shared/buttons/buttons.module.scss'

interface IProps {
  handler: () => void
  text: string
}

export const BtnCreate: FC<IProps> = ({ handler, text }) => (
  <button className={style.buttonCreate} onClick={handler} data-test-id="btn-create">
    {text}
  </button>
)
