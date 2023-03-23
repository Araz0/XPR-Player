import { memo } from 'react'

import styled from 'styled-components'

import { WHITE_COLOR, BACKGROUND_COLOR_PRIMERY } from 'constants/styles'

const StyledSpan = styled.span`
  background-color: ${WHITE_COLOR};
  color: ${BACKGROUND_COLOR_PRIMERY};
  border-radius: 15px;
  padding: 3px 7px;
`

export type ChipProps = {
  label: string
}
export const ChipRaw = ({ label }: ChipProps) => {
  return <StyledSpan>{label}</StyledSpan>
}

export const Chip = memo(ChipRaw)
