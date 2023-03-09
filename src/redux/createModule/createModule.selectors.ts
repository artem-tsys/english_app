import { RootState } from 'src/redux/app'
import { Languages } from 'src/types/languages'

type CreateModuleLanguage = (state: RootState) => Languages
export const createModuleLanguage: CreateModuleLanguage = (state) => state.createModule.languages
