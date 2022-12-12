import { ModulesCard } from 'src/components/shared/cards/modules/modules.card'
import { IModule } from 'src/types/modules'
import { CreateSlider } from 'src/components/shared/slider/Slider-creator'

export const ModulesSlider = CreateSlider<IModule>({
  Card: ModulesCard,
  title: 'Modules',
})
