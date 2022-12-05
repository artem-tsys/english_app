import { RootState } from 'src/redux/app'

export const popupNameSelector = (state: RootState) => state.common.popup
export const popupDataSelector = (state: RootState) => state.common.popupData
