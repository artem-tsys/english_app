import { IPhrase } from 'src/types/phrases'

export type AnswerPopup = {
  onClose: () => void
  question: IPhrase
  answer: {
    text: string
  }
}

export type IModalType = 'success' | 'failed' | null
