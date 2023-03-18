import { RootState } from 'src/redux/app'
import { modulesAdapter } from 'src/redux/modules/modules.slice'
import { IModule } from 'src/types/modules'

export const modulesSelectors = modulesAdapter.getSelectors<RootState>((state) => state.modules)

export const currentModuleSelector = (state: RootState) => modulesSelectors.selectById(state, state.common.moduleId)
export const currentTermsSelector = (state: RootState) => {
  const module: IModule = currentModuleSelector(state)
  return module?.terms ?? []
}
export const termsLengthSelector = (state: RootState) => {
  const terms = currentTermsSelector(state)
  return terms.length
}
