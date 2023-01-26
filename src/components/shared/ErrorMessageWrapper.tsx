import styled from 'styled-components'

export const ErrorMessageWrapper = (props): JSX.Element => {
  const Wrapper = styled.div`
    position: relative;
    height: 1.4em;
    color: ${(prop) => prop.color ?? '#d2000f'};
    font-size: ${(prop) => prop.size ?? '14px'};
    line-height: 1.4em;
  `

  return <Wrapper {...props} />
}
