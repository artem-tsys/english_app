import { useEffect, useRef, useState } from 'react'
import { Answers } from 'src/components/exercises/memorization/Answers'
import { Question } from 'src/components/exercises/memorization/Question'
import { AnswerPopupFactory } from 'src/components/shared/popups/exercises-memorization/answer-popup-factory'
import { IModalType } from 'src/components/shared/popups/exercises-memorization/popup.types'
import { MEMORIZATION_COUNT_ANSWERS } from 'src/constants/exercises'
import { useModal } from 'src/hooks/modal'
import { IPhrase } from 'src/types/phrases'
import { getAnswersListById } from 'src/utils/answerList'
import { isEqual } from 'src/utils/isEqual'
import { shuffle } from 'src/utils/shuffle'

type IRound = (props: {
  roundPhrases: IPhrase[]
  handleCompleteRound: (a: string[]) => void
  listAllPhrases: IPhrase[]
  refWrapper: ReturnType<typeof useRef>
}) => JSX.Element

export const Round: IRound = ({ roundPhrases, handleCompleteRound, listAllPhrases, refWrapper }) => {
  const [indexActivePhrase, setIndexActivePhrase] = useState<number>(0)
  const memorizationIds: string[] = []
  const [modal, setModal] = useState<IModalType>(null)

  const currentPhrase = roundPhrases[indexActivePhrase]

  const { Modal, isOpen, openModal } = useModal({ background: 'rgba(89,89,89,0.94)', bindTo: refWrapper.current })

  useEffect(() => {
    const maxIndexPhrases = roundPhrases.length - 1
    if (indexActivePhrase === maxIndexPhrases) {
      handleCompleteRound(memorizationIds)
    }
  }, [indexActivePhrase])

  const answers = shuffle<IPhrase>(
    getAnswersListById<IPhrase>(listAllPhrases, MEMORIZATION_COUNT_ANSWERS, currentPhrase.id),
  )

  const onAnswerSelected = (idAnswer: string) => (event: Event) => {
    if (isEqual(currentPhrase.id, idAnswer)) {
      setModal('success')
      openModal(event)
      memorizationIds.push(currentPhrase.id)
    } else {
      setModal('failed')
      openModal(event)
    }
    // setIndexActivePhrase(index => index + 1);
  }

  const handleNextRound = () => {
    setIndexActivePhrase((index) => index + 1)
  }

  return (
    <>
      <div>
        <Question text={currentPhrase.en} />
        <Answers answers={answers} onAnswerSelected={onAnswerSelected} />
      </div>

      {isOpen && (
        <Modal>
          <AnswerPopupFactory
            type={modal}
            onClose={handleNextRound}
            question={currentPhrase}
            answer={{
              text: 'fdf',
            }}
          />
        </Modal>
      )}
    </>
  )
}
