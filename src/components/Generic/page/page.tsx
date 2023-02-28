import { FC, ReactNode } from 'react'
import { useAppSelector } from 'src/hooks/redux'

type PageProps = {
  children: ReactNode
}

export const Page: FC<PageProps> = ({ children }) => {
  const { error, loadingStatus } = useAppSelector((state) => state.modules)

  if (loadingStatus === 'pending' || loadingStatus === 'idle') {
    return <div>...Loading</div>
  }
  if (loadingStatus === 'failed') {
    return <div>{error ?? 'unknown error'}</div>
  }
  return <>{children}</>
}
