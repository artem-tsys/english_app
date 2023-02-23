import { createSlice } from '@reduxjs/toolkit'

/* eslint-disable no-param-reassign */
const initialState = {
  moduleId: null,
  modal: {
    name: null,
    data: null,
    animate: false,
  },
  reserveModal: [],
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    SHOW_MODAL: (state, action) => {
      const { name, data, animate } = action.payload
      if (state.modal.name) {
        state.reserveModal.push(state.modal)
      }
      state.modal = { name, data, animate }
    },
    HIDE_MODAL: (state) => {
      if (state.reserveModal.length > 0) {
        state.modal = state.reserveModal.shift()
      } else {
        state.modal = { name: null, data: null, animate: false }
      }
    },
    UPDATE_MODULE_ID: (state, action) => {
      state.moduleId = action.payload
    },
    REMOVE_CURRENT_MODULE(state) {
      state.moduleId = null
    },
  },
})

export const { UPDATE_MODULE_ID, SHOW_MODAL, HIDE_MODAL } = commonSlice.actions
