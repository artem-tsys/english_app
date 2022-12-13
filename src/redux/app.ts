import { configureStore } from '@reduxjs/toolkit'
import { exercisesSlice } from 'src/redux/exercises/exercises.slice'
import { commonSlice } from 'src/redux/general/common.slice'
import { modulesSlice } from 'src/redux/modules/modules.slice'

export const appStore = configureStore({
  reducer: {
    modules: modulesSlice.reducer,
    exercises: exercisesSlice.reducer,
    common: commonSlice.reducer,
  },
})

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>
