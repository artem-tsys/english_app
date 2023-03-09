import React, { FC } from 'react'
import style from 'src/components/shared/buttons/buttons.module.scss'

type LanguageButtonProps = { onClick; text: string; langKey: string | number }

export const LanguageButton: FC<LanguageButtonProps> = ({ onClick, text, langKey }) => (
  <button
    type="button"
    className={style.buttonLanguage}
    data-testid="term-language"
    data-langkey={langKey}
    onClick={onClick}
  >
    {text}
  </button>
)
