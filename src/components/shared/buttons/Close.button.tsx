import style from 'src/components/shared/buttons/buttons.module.scss'

export const CloseButton = ({ handleClick }: { handleClick: () => void }) => (
  <button onClick={handleClick} className={style.buttonClose} aria-label="close" data-testid="btn-close" />
)
