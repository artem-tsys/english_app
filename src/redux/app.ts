import { configureStore } from '@reduxjs/toolkit'
import { modulesSlice } from 'src/redux/modules/modules.slice'

export const appStore = configureStore({
  reducer: {
    modules: modulesSlice.reducer,
  },
})

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>
