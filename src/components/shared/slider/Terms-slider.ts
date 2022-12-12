import { ITerm } from 'src/types/terms'
import { TermCard } from 'src/components/shared/cards/term/term.card'
import { CreateSlider } from 'src/components/shared/slider/Slider-creator'

export const TermsSlider = CreateSlider<ITerm>({
  Card: TermCard,
  config: {
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '30px',
  },
})
