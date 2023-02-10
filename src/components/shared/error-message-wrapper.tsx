import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  height: 1.4em;
  color: ${(prop) => prop.color ?? '#d2000f'};
  font-size: ${(prop) => prop.size ?? '14px'};
  line-height: 1.4em;
`

export const ErrorMessageWrapper = (props): JSX.Element => <Wrapper {...props} />
