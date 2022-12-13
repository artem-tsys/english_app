import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { fetchModules } from 'src/redux/modules/modules.thinks'
import { IModule } from 'src/types/modules'

/* eslint-disable no-param-reassign */

export const modulesAdapter = createEntityAdapter<IModule>()

interface IModulesState {
  loadingStatus: 'idle' | 'pending' | 'completed' | 'failed'
  error: string | null
}

export const modulesSlice = createSlice({
  name: 'modules',
  initialState: modulesAdapter.getInitialState<IModulesState>({
    loadingStatus: 'idle',
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.loadingStatus = 'pending'
        state.error = null
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        const modules = _.omit(action.payload, 'exercises')
        modulesAdapter.setAll(state, modules)
        state.loadingStatus = 'completed'
        state.error = null
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.loadingStatus = 'failed'
        state.error = action.error.message ?? 'error'
      })
  },
})
