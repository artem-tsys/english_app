import { updateModule } from 'src/api/modules.api'
import { POPUPS } from 'src/constants/popups.constans'
import { submitLearned } from 'src/redux/exercises/exercises.actions'
import { SUBMIT_LEARNED } from 'src/redux/exercises/exercises.constans'
import {
  activeTermIndexSelector,
  isLearnedMemorizationSelector,
  memorizationLastRoundSelector,
  memorizationLearnedSelector,
  roundNumberSelector,
  roundTermsIdsSelector,
} from 'src/redux/exercises/exercises.selectors'
import {
  addLearnedTerm,
  addLearnedTermRound,
  endMemorizationMode,
  exercisesSlice,
  roundForward,
} from 'src/redux/exercises/exercises.slice'
import { moduleIdSelector } from 'src/redux/general/common.selectors'
import { HIDE_MODAL, SHOW_MODAL } from 'src/redux/general/common.slice'

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
      await dispatch(submitLearned())
      setTimeout(() => {
        dispatch(SHOW_MODAL({ name: POPUPS.EXERCISE_MEMORIZATION_FINISH_ROUND }))
      }, 1000)
      break
    }
    case ACTIVE_TERM_FORWARD.type: {
      const state = getState()
      const activeTerm = activeTermIndexSelector(state)
      const termsRound = roundTermsIdsSelector(state)

      dispatch(HIDE_MODAL())

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
