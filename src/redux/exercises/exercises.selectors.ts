import { RootState } from 'src/redux/app'

export const memorizationSelector = (state: RootState) => state.exercises.memorization
export const memorizationActiveTermIndexSelector = (state: RootState) => state.exercises.memorization.activeTermIndex
