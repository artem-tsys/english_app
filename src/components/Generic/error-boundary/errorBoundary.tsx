import { FC, ReactNode } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  try {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
  } catch (e) {
    return <div>error components</div>
  }
}
