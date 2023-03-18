import { useModule } from 'src/hooks/useModule'
import { ITerm } from 'src/types/terms'

export const useTerms = (): ITerm[] => {
  const module = useModule()
  return module.terms ?? []
}
