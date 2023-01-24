import React from 'react'
import style from 'src/components/pages/create-module/create-module.module.scss'

type LanguageButtonProps = { onClick; text: string; langKey: string | number }

export const LanguageButton = ({ onClick, text, langKey }: LanguageButtonProps) => (
  <button type="button" className={style.language} data-testid="term-language" data-langkey={langKey} onClick={onClick}>
    {text}
  </button>
)