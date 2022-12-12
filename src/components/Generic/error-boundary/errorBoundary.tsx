export const ErrorBoundary = ({ children }): JSX.Element => {
  try {
    return children
  } catch (e) {
    return <div>error components</div>
  }
}
