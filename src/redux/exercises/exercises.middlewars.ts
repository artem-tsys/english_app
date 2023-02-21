import { updateModule } from 'src/api/modules.api'
import { submitLearned } from 'src/redux/exercises/exercises.actions'
import { SUBMIT_LEARNED } from 'src/redux/exercises/exercises.constans'
import {
  activeTermIndexSelector,
  isLearnedMemorizationSelector,
  memorizationLastRoundSelector,
  memorizationLearnedSelector,
  roundNumberSelector,
  roundTermsSelector,
} from 'src/redux/exercises/exercises.selectors'
import {
  addLearnedTerm,
  addLearnedTermRound,
  endMemorizationMode,
  exercisesSlice,
  roundForward,
} from 'src/redux/exercises/exercises.slice'
import { moduleIdSelector } from 'src/redux/general/common.selectors'
import { HIDE_POPUP_ANIMATE } from 'src/redux/general/common.slice'

const { ROUND_FORWARD, ACTIVE_TERM_FORWARD } = exercisesSlice.actions

export const exercisesMiddleware = (store) => (next) => async (action) => {
  const { dispatch, getState } = store

  next(action)
  switch (action.type) {
    case SUBMIT_LEARNED: {
      const state = getState()
      const moduleId = moduleIdSelector(state)
      const moduleUpdate = {
        exercises: {
          memorization: {
            round: roundNumberSelector(state),
            isLearned: isLearnedMemorizationSelector(state),
            learnedIds: memorizationLearnedSelector(state),
          },
        },
      }

      try {
        await updateModule(moduleId, moduleUpdate)
      } catch (err) {
        console.error(err.message)
      }
      break
    }
    case ROUND_FORWARD.type: {
      const state = getState()
      const lastRound = memorizationLastRoundSelector(state)
      const roundNumber = roundNumberSelector(state)

      if (lastRound === roundNumber) {
        dispatch(endMemorizationMode())
      }

      dispatch(submitLearned())
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
