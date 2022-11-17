import { modulesAdapter } from './app.slice'
import { RootState } from './app'

export const modulesSelectors = modulesAdapter.getSelectors<RootState>(
  (state) => state.modules
)
