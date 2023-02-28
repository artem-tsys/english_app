import { useParams } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/redux'
import { modulesSelectById } from 'src/redux/modules/modules.selectors'
import { IModule } from 'src/types/modules'

export const useModule = (): IModule => {
  const routeParams = useParams()
  const { moduleId } = useAppSelector((state) => state.common)
  const module = useAppSelector(modulesSelectById(moduleId ?? routeParams.moduleId))

  return module ?? null
}
