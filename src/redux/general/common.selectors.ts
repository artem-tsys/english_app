import { RootState } from 'src/redux/app'

export const modalNameSelector = (state: RootState) => state.common.modal.name
export const modalDataSelector = (state: RootState) => state.common.modal.data
export const modalStateAnimateSelector = (state: RootState) => state.common.modal.animate
export const modalAnimationSelector = (state: RootState) => state.common.animationModal
export const moduleIdSelector = (state: RootState) => state.common.moduleId
