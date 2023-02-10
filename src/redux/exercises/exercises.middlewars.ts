import { submitLearned } from 'src/redux/exercises/exercises.actions'
import {
  activeTermIndexSelector,
  isLearnedMemorizationSelector,
  memorizationLastRoundSelector,
  roundTermsSelector,
} from 'src/redux/exercises/exercises.selectors'
import {
  addLearnedTerm,
  addLearnedTermRound,
  endMemorizationMode,
  exercisesSlice,
  roundForward,
} from 'src/redux/exercises/exercises.slice'
import { HIDE_POPUP_ANIMATE } from 'src/redux/general/common.slice'

const { ROUND_FORWARD, SUBMIT_LEARNED, ACTIVE_TERM_FORWARD } = exercisesSlice.actions

export const exercisesMiddleware = (store) => (next) => (action) => {
  const { dispatch, getState } = store

  next(action)
  switch (action.type) {
    case SUBMIT_LEARNED.type: {
      // eslint-disable-next-line no-console
      console.log('submit learned terms')
      break
    }
    case ROUND_FORWARD.type: {
      const state = getState()
      const roundNumber = activeTermIndexSelector(state)
      const lastRound = memorizationLastRoundSelector(state)
      const isLearned = isLearnedMemorizationSelector(state)

      if (roundNumber === lastRound) {
        dispatch(submitLearned())
      }

      if (isLearned) {
        dispatch(endMemorizationMode())
      }
      break
    }
    case ACTIVE_TERM_FORWARD.type: {
      const state = getState()
      const activeTerm = activeTermIndexSelector(state)
      const termsRound = roundTermsSelector(state)

      dispatch(HIDE_POPUP_ANIMATE())

      if (action.payload) {
        dispatch(addLearnedTermRound(action.payload))
      }
      if (activeTerm === termsRound.length) {
        dispatch(addLearnedTerm())
        dispatch(roundForward())
      }
      break
    }
  }
}
