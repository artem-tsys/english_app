import { FC } from 'react'
import { Language } from 'src/components/shared/languages/language'
import style from 'src/components/shared/languages/languages.module.scss'
import { LanguagesTypes } from 'src/types/languages'

type LanguagesProps = {
  title: string
  languages: LanguagesTypes
  onClick?
}

export const Languages: FC<LanguagesProps> = ({ title, languages, onClick }) => {
  const list = Object.entries(languages)

  return (
    <div className={style.container}>
      <div className={style.languagesHeader}>
        <h3 className={style.title}>{title}</h3>
      </div>
      <ul className={style.list}>
        {list.map(([key, value]) => (
          <Language text={value} value={key} onClick={onClick} key={key} />
        ))}
      </ul>
    </div>
  )
}
