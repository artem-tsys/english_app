import React, { FC } from 'react'
import style from 'src/components/shared/headers/headers.module.scss'
import { IHeaderProps } from 'src/types/header'

export const Header: FC<IHeaderProps> = ({ children }) => <header className={style.header}>{children}</header>
