import { useAppSelector } from 'src/hooks/redux'

export const Page = ({ children }): JSX.Element => {
  const { error, loadingStatus } = useAppSelector((state) => state.modules)

  if (loadingStatus === 'pending' || loadingStatus === 'idle') {
    return <div>...Loading</div>
  }
  if (loadingStatus === 'failed') {
    return <div>{error ?? 'unknown error'}</div>
  }
  return children
}
