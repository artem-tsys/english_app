import { updateModule } from 'src/api/modules.api'
import { POPUPS } from 'src/constants/popups.constans'
import { submitLearned } from 'src/redux/exercises/exercises.actions'
import { SUBMIT_LEARNED } from 'src/redux/exercises/exercises.constans'
import {
  activeTermIndexSelector,
  isLearnedMemorizationSelector,
  learnedTermsSelector,
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
import { modulesSelectById } from 'src/redux/modules/modules.selectors'

const { ROUND_FORWARD, ACTIVE_TERM_FORWARD, ADD_LEANED_TERM } = exercisesSlice.actions

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
      dispatch(SHOW_MODAL({ name: POPUPS.EXERCISE_MEMORIZATION_FINISH_ROUND }))
      break
    }
    case ACTIVE_TERM_FORWARD.type: {
      const state = getState()
      const activeTerm = activeTermIndexSelector(state)
      const termsRound = roundTermsIdsSelector(state)
      const learnedIds = memorizationLearnedSelector(state)

      if (action.payload) {
        await dispatch(addLearnedTermRound(action.payload))
      }
      if (activeTerm === termsRound.length) {
        await dispatch(addLearnedTerm(learnedIds))
        await dispatch(roundForward())
      }

      dispatch(HIDE_MODAL())
      break
    }
  }
}

export const exercisesAddLearnedMiddleware = (store) => (next) => async (action) => {
  const { getState } = store

  switch (action.type) {
    case ADD_LEANED_TERM.type: {
      const state = getState()

      const languagesRound = learnedTermsSelector(state)
      const moduleId = moduleIdSelector(state)
      const { languages } = modulesSelectById(moduleId)(state)

      const preparedLearnedIds = []
      Object.entries(languagesRound).forEach(([id, value]) => {
        if (value.includes(languages.lang1) && value.includes(languages.lang2)) {
          preparedLearnedIds.push(id)
        }
      })

      next({ ...action, payload: preparedLearnedIds })
      return
    }
  }
  next(action)
}
