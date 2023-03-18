import { FC } from 'react'
import { TermCard } from 'src/components/shared/cards/term/term.card'
import { CreateSlider } from 'src/components/shared/slider/Slider-creator'
import { useTerms } from 'src/hooks/useTerms'
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
  const terms = useTerms()

  if (!terms) return null

  return <Slider data={terms} />
}

export default TermsSlider
