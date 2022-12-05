import { RootState } from 'src/redux/app'

export const memorizationSelector = (state: RootState) => state.exercises.memorization
export const memorizationActivePhraseIndexSelector = (state: RootState) =>
  state.exercises.memorization.activePhraseIndex
export const cardsSelector = (state: RootState) => state.exercises.cards
