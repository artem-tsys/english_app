import { useModule } from 'src/hooks/useModule'

export const useTerms = () => {
  const module = useModule()
  return module ? module.terms : []
}
