import { ModulesCard } from 'src/components/shared/cards/modules/modules.card'
import { CreateSlider } from 'src/components/shared/slider/Slider-creator'
import { IModule } from 'src/types/modules'

export const ModulesSlider = CreateSlider<IModule>({
  Card: ModulesCard,
  title: 'modules',
})
