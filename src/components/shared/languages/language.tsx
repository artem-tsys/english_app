import style from 'src/components/shared/languages/languages.module.scss'

type LanguagesListProps = {
  text: string
  value: string
  onClick?
}

export const Language = ({ text, value, onClick }: LanguagesListProps): JSX.Element => (
  <li className={style.element}>
    <button onClick={onClick} data-value={value} className={style.button}>
      {text}
    </button>
  </li>
)
