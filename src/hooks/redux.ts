import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { modulesSelectById } from 'src/redux/modules/modules.selectors'
import { IModule } from 'src/types/modules'
import { AppDispatch, RootState } from '../redux/app'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useModule = (): IModule => {
  const routeParams = useParams()
  const { moduleId } = useAppSelector((state) => state.common)
  const module = useAppSelector(modulesSelectById(moduleId ?? routeParams.moduleId))
  return module ?? null
}

export const useTerms = () => {
  const module = useModule()
  return module ? module.terms : []
}
