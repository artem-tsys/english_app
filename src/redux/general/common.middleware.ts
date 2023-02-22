import { updateMemorization } from 'src/redux/exercises/exercises.slice'
import { moduleIdSelector } from 'src/redux/general/common.selectors'
import { UPDATE_MODULE_ID } from 'src/redux/general/common.slice'
import { modulesSelectById } from 'src/redux/modules/modules.selectors'

export const commonMiddleware = (store) => (next) => async (action) => {
  const { dispatch, getState } = store

  next(action)
  switch (action.type) {
    case UPDATE_MODULE_ID.type: {
      const state = getState()
      const moduleId = moduleIdSelector(state)
      const { exercises } = modulesSelectById(moduleId)(state)
      const config = {
        learnedIds: exercises.memorization.learnedIds,
        isLearned: exercises.memorization.isLearned,
        roundNumber: exercises.memorization.round,
      }
      dispatch(updateMemorization(config))
      break
    }
  }
}
