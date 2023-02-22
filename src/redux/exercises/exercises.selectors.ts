import { RootState } from 'src/redux/app'

export const activeTermIndexSelector = (state: RootState) => state.exercises.memorization.activeTermIndex
export const roundNumberSelector = (state: RootState) => state.exercises.memorization.roundNumber
export const roundTermsIdsSelector = (state: RootState) => state.exercises.memorization.termsRound
export const learnedTermsSelector = (state: RootState) => state.exercises.memorization.learnedTermsRound
export const memorizationLastRoundSelector = (state: RootState) => state.exercises.memorization.termsRound.length
export const isLearnedMemorizationSelector = (state: RootState) => state.exercises.memorization.isLearned
export const memorizationLearnedSelector = (state: RootState) => state.exercises.memorization.learnedIds
