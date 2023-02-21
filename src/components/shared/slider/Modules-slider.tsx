import { ModulesCard } from 'src/components/shared/cards/modules/modules.card'
import { CreateSlider } from 'src/components/shared/slider/Slider-creator'
import { useAppSelector } from 'src/hooks/redux'
import { modulesSelectors } from 'src/redux/modules/modules.selectors'
import { IModule } from 'src/types/modules'

const Slider = CreateSlider<IModule>({
  Card: ModulesCard,
  title: 'modules',
})

export const ModulesSlider = (props) => {
  const modules = useAppSelector(modulesSelectors.selectAll)

  if (!modules) return null

  return <Slider data={modules} {...props} />
}
