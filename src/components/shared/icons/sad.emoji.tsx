import { FC } from 'react'

interface ISadEmoji {
  className?: string
}

export const SadEmoji: FC<ISadEmoji> = ({ className }) => (
  <img src={`${process.env.PUBLIC_URL}/icons/emoji-face-sad.png`} alt="sad" className={className} />
)
