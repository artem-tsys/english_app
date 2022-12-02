import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Congratulation } from 'src/components/exercises/memorization/Congratulation'
import { Round } from 'src/components/exercises/memorization/Round'
import { Header } from 'src/components/headers/Header'
import style from 'src/components/headers/headers.module.scss'
import { CloseButton } from 'src/components/shared/buttons/Close.button'
import { MEMORIZATION_ROUND_COUNT } from 'src/constants/exercises'
import { useAppDispatch, useAppSelector, usePhrases } from 'src/hooks/redux'
import { memorizationSelector } from 'src/redux/exercises/exercises.selectors'
import { updateMemorization } from 'src/redux/exercises/exercises.slice'
import styleMain from 'src/styles/main.module.scss'
import { IPhrase } from 'src/types/phrases'
import { ObjectsFromArrayById } from 'src/utils/getRandomElementsFromArray'

type Mode = 'round' | 'finishRound' | 'finishModule'

export const MemorizationPage = () => {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // eslint-disable-next-line no-console
  console.log('moduleId', moduleId)
  const phrases = usePhrases(moduleId ?? '')
  const [mode, setMode] = useState<Mode>('round')
  const refWrap = useRef(null)

  const { round, learnedIds } = useAppSelector(memorizationSelector)
  // let roundNumber = 1;
  // const [roundNumber, setRoundNumber] = useState<number>(1);
  // const [memorizationPhrasesIds, setMemorizationPhrasesIds] = useState<string[]>([]);

  const PhrasesConstructor = new ObjectsFromArrayById('random')
  const currentRoundPhrases = PhrasesConstructor.create<IPhrase>(phrases, MEMORIZATION_ROUND_COUNT, learnedIds)

  useEffect(() => {
    if (phrases.length !== 0 && learnedIds.length === phrases.length) {
      setMode('finishModule')
    }
  }, [phrases, learnedIds])

  const handleCompleteRound = (idsMemorization: string[]) => {
    dispatch(
      updateMemorization({
        round: round + 1,
        learnedIds: idsMemorization,
      }),
    )

    // setTimeout(() => {
    setMode('finishRound')
    // }, 2000)
  }

  const closeRoundHandler = () => {
    navigate(-1)
  }

  const handleNextStep = () => {
    setMode('round')
  }

  if (currentRoundPhrases.length === 0) {
    return null
  }

  // if(learnedIds.length === phrases.length) {
  // 	return <div >congratulations you final the module </div>
  // }

  switch (mode) {
    case 'round':
      return (
        <div ref={refWrap}>
          <Header>
            <CloseButton handleClick={closeRoundHandler} />
            <p className={cn(style.title, styleMain.centerAbs)}>{`round ${round}`}</p>
          </Header>
          <Round
            roundPhrases={currentRoundPhrases}
            handleCompleteRound={handleCompleteRound}
            listAllPhrases={phrases}
            refWrapper={refWrap}
          />
        </div>
      )
    case 'finishRound':
      return <Congratulation round={round} handleNextStep={handleNextStep} />
    case 'finishModule':
      return <Congratulation round={999} handleNextStep={handleNextStep} />
    default:
      navigate(-1)
      return null
  }
}
