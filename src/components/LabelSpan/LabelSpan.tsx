import { memo } from 'react'

import styled from 'styled-components'

import { WHITE_COLOR } from 'constants/styles'

const StyledLabelSpan = styled.span`
  border: 1px solid ${WHITE_COLOR};
  padding: 1px 12px;
  border-radius: 5px;
  font-size: 14px;
  color: ${WHITE_COLOR};
  align-self: center;
  padding: 2px 12px;
`
export type LabelSpanProps = {
  children?: React.ReactNode
}
export const LabelSpanRaw = ({ children }: LabelSpanProps) => {
  return <StyledLabelSpan>{children}</StyledLabelSpan>
}

export const LabelSpan = memo(LabelSpanRaw)
