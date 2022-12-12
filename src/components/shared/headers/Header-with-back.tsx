import { FC } from 'react'
import { Header } from 'src/components/shared/headers/Header'
import { ComebackButton } from 'src/components/shared/buttons/Comeback.button'
import { IHeaderProps } from 'src/types/header'

export const HeaderWithBack: FC<IHeaderProps> = ({ children }) => (
  <Header>
    <ComebackButton />
    {children}
  </Header>
)
