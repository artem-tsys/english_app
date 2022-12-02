import { RootState } from 'src/redux/app'
import { modulesAdapter } from 'src/redux/modules/modules.slice'

export const modulesSelectors = modulesAdapter.getSelectors<RootState>((state) => state.modules)

export const modulesSelectById = (id: string) => (state: RootState) => modulesSelectors.selectById(state, id)
