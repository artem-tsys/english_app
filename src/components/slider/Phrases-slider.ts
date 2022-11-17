import { IPhrase } from '../../types/phrases'
import { PhraseCard } from '../cards/phrase/phrase.card'
import { CreateSlider } from './Slider-creator'

export const PhrasesSlider = CreateSlider<IPhrase>({
  Card: PhraseCard,
  config: {
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '30px',
  },
})
