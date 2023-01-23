import style from 'src/components/shared/languages/languages.module.scss'
import { LanguagesTypes } from 'src/constants/languages.constants'

type LanguagesListProps = {
  languages: LanguagesTypes
  onClick?
}

export const LanguagesList = ({ languages, onClick }: LanguagesListProps): JSX.Element => {
  const list = Object.entries(languages)
  return (
    <ul className={style.list}>
      {list.map(([key, name]) => (
        <li key={key} className={style.element}>
          <button onClick={onClick} data-value={key} className={style.button}>
            {name}
          </button>
        </li>
      ))}
    </ul>
  )
}
