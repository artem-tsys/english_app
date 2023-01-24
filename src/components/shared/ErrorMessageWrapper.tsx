import styled from 'styled-components'

export const ErrorMessageWrapper = ({ color = '#d2000f', size = '14px', children }): JSX.Element => {
  const Wrapper = styled.div`
    position: relative;
    color: ${color};
    font-size: ${size};
    line-height: 1.4em;
  `
  return <Wrapper>{children}</Wrapper>
}
