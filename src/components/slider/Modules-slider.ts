import { IModule } from '../../types/modules'
import { Modules } from '../cards/modules/modules'
import { CreateSlider } from './Slider-creator'

export const ModulesSlider = CreateSlider<IModule>({
  Card: Modules,
  title: 'Modules',
})
