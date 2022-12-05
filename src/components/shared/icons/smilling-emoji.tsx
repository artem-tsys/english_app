import { FC } from 'react'

interface ISmilingEmoji {
  className?: string
}

export const SmilingEmoji: FC<ISmilingEmoji> = ({ className }) => (
  <img src={`${process.env.PUBLIC_URL}/icons/emoji-face-smiling.png`} alt="sad" className={className} />
)
