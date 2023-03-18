import { FC } from 'react'
import { TermCard } from 'src/components/shared/cards/term/term.card'
import { CreateSlider } from 'src/components/shared/slider/Slider-creator'
import { useAppSelector } from 'src/hooks/redux'
import { currentTermsSelector } from 'src/redux/modules/modules.selectors'
import { ITerm } from 'src/types/terms'

const Slider = CreateSlider<ITerm>({
  Card: TermCard,
  config: {
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '30px',
  },
})

const TermsSlider: FC = () => {
  const terms = useAppSelector(currentTermsSelector)

  return <Slider data={terms} />
}

export default TermsSlider
