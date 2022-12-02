import { FC } from 'react'

type ICongratulation = FC<{
  round: number | string
  handleNextStep: () => void
}>

export const Congratulation: ICongratulation = ({ round, handleNextStep }) => (
  <div>
    <h3>Congratulation !!!</h3>
    <p>You finished Round {round}.</p>
    <button onClick={handleNextStep}>Next round</button>
  </div>
)
