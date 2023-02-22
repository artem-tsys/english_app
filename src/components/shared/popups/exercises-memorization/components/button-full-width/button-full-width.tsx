import cn from 'classnames'
import { ReactNode } from 'react'
import style from './button-full-width.module.scss'

interface ButtonFullWidthProps {
  onClick?: () => void
  className?: string | Record<string, string>
  children?: ReactNode
}

export const ButtonFullWidth = ({ onClick, className, children }: ButtonFullWidthProps): JSX.Element => (
  <button onClick={onClick} className={cn(className, style.button)}>
    {children}
  </button>
)
