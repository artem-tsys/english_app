import style from 'src/components/shared/languages/languages.module.scss'
import { LanguagesList } from 'src/components/shared/languages/languagesList'
import { LanguagesTypes } from 'src/constants/languages.constants'

type LanguagesProps = {
  title: string
  languages: LanguagesTypes
  onClick?
}

export const Languages = ({ title, languages, onClick }: LanguagesProps): JSX.Element => (
  <div className={style.container}>
    <div className={style.languagesHeader}>
      <h3 className={style.title}>{title}</h3>
    </div>
    <LanguagesList languages={languages} onClick={onClick} />
  </div>
)
