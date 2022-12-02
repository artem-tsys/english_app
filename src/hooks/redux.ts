import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { modulesSelectById } from 'src/redux/modules/modules.selectors'
import { AppDispatch, RootState } from '../redux/app'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const usePhrases = (parentId: string) => {
  const { moduleId } = useAppSelector((state) => state.common)
  const module = useAppSelector(modulesSelectById(moduleId ?? parentId))
  return module?.phrases ?? []
}
