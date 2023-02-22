import { FC } from 'react'
import { ComebackButton } from 'src/components/shared/buttons/Comeback.button'
import { Header } from 'src/components/shared/headers/Header'
import { IHeaderProps } from 'src/types/header'

export const HeaderWithBack: FC<IHeaderProps> = ({ className, children }) => (
  <Header className={className}>
    <ComebackButton />
    {children}
  </Header>
)
