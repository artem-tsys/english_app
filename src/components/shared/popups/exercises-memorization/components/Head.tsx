import cn from 'classnames'
import React, { FC } from 'react'
import style from 'src/components/shared/popups/exercises-memorization/components/index.module.scss'
import { IModalType } from 'src/components/shared/popups/exercises-memorization/popup.types'

type HeadType = {
  background?: IModalType
  children?: React.ReactNode
}

export const HeaderPopup: FC<HeadType> = ({ children, background }) => {
  const styleHead = cn(
    {
      [style.backgroundSuccess]: background === 'success',
      [style.backgroundWrong]: background === 'failed',
      [style.backgroundTransparent]: !background,
    },
    style.head,
  )

  return (
    <div className={styleHead}>
      шото тут
      {children}
    </div>
  )
}
