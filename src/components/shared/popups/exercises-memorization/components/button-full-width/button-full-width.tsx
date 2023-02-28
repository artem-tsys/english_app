import cn from 'classnames'
import { FC, ReactNode } from 'react'
import style from './button-full-width.module.scss'

interface ButtonFullWidthProps {
  onClick?: () => void
  className?: string | Record<string, string>
  children?: ReactNode
}

export const ButtonFullWidth: FC<ButtonFullWidthProps> = ({ onClick, className, children }) => (
  <button onClick={onClick} className={cn(className, style.button)}>
    {children}
  </button>
)
