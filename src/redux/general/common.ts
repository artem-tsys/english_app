import { createSlice } from '@reduxjs/toolkit'

/* eslint-disable no-param-reassign */

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    moduleId: null,
  },
  reducers: {
    actionSetModuleId: (state, action) => {
      state.moduleId = action.payload
    },
    removeCurrentModule(state) {
      state.moduleId = null
    },
  },
})

export const { actionSetModuleId, removeCurrentModule } = commonSlice.actions
