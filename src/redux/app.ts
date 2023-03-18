import { configureStore } from '@reduxjs/toolkit'
import { createModuleSlice } from 'src/redux/createModule/createModule.slice'
import { exercisesAddLearnedMiddleware, exercisesMiddleware } from 'src/redux/exercises/exercises.middlewars'
import { exercisesSlice } from 'src/redux/exercises/exercises.slice'
import { commonMiddleware } from 'src/redux/general/common.middleware'
import { commonSlice } from 'src/redux/general/common.slice'
import { modulesSlice } from 'src/redux/modules/modules.slice'

export const createConfigureStore = (initState = {}) =>
  configureStore({
    reducer: {
      modules: modulesSlice.reducer,
      exercises: exercisesSlice.reducer,
      common: commonSlice.reducer,
      createModule: createModuleSlice.reducer,
    },
    preloadedState: initState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([exercisesMiddleware, exercisesAddLearnedMiddleware, commonMiddleware]),
  })

export const appStore = createConfigureStore()

export type AppDispatch = typeof appStore.dispatch
export type RootState = ReturnType<typeof appStore.getState>
