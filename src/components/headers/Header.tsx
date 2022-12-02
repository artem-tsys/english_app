import cn from 'classnames'
import React, { FC } from 'react'
import { IHeaderProps } from 'src/types/header'
import style from './headers.module.scss'

export const Header: FC<IHeaderProps> = ({ children, styles }) => (
  <header className={cn(style.header, styles)}>{children}</header>
)
