import cn from 'classnames'
import style from 'src/components/shared/buttons/buttons.module.scss'

type CloseButtonProps = { handleClick: () => void; className?: string }

export const CloseButton = ({ handleClick, className }: CloseButtonProps) => (
  <button
    onClick={handleClick}
    className={cn(style.buttonClose, className)}
    aria-label="close"
    data-testid="btn-close"
  />
)
