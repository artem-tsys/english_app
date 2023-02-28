import { RootState } from 'src/redux/app'
import { LanguagesInitial } from 'src/types/languages'

type CreateModuleLanguage = (state: RootState) => LanguagesInitial
export const createModuleLanguage: CreateModuleLanguage = (state) => state.createModule.languages
