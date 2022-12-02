import { ModulesCard } from 'src/components/cards/modules/modules.card'
import { IModule } from '../../types/modules'
import { CreateSlider } from './Slider-creator'

export const ModulesSlider = CreateSlider<IModule>({
  Card: ModulesCard,
  title: 'Modules',
})
