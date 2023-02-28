import cn from 'classnames'
import { FC } from 'react'
import style from 'src/components/shared/buttons/buttons.module.scss'

type CloseButtonProps = { handleClick: () => void; className?: string }

export const CloseButton: FC<CloseButtonProps> = ({ handleClick, className }) => (
  <button
    onClick={handleClick}
    className={cn(style.buttonClose, className)}
    aria-label="close"
    data-testid="btn-close"
  />
)
