import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { fetchModules } from './app.thinks'
import { IModule } from '../types/modules'

/* eslint-disable no-param-reassign */

export const modulesAdapter = createEntityAdapter<IModule>()

interface IState {
  loadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

export const modulesSlice = createSlice({
  name: 'modules',
  initialState: modulesAdapter.getInitialState<IState>({
    loadingStatus: 'idle',
    error: null,
  }),
  reducers: {
    modules: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.loadingStatus = 'pending'
        state.error = null
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        // eslint-disable-next-line no-console
        console.log(action.payload)
        modulesAdapter.setAll(state, action.payload)
        state.loadingStatus = 'idle'
        state.error = null
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.loadingStatus = 'failed'
        state.error = action.error.message ?? 'error'
      })
  },
})
