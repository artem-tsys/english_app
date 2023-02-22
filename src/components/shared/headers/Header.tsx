import cn from 'classnames'
import React, { FC } from 'react'
import style from 'src/components/shared/headers/headers.module.scss'
import { IHeaderProps } from 'src/types/header'

export const Header: FC<IHeaderProps> = ({ className, children }) => (
  <header className={cn(style.header, className)}>{children}</header>
)
