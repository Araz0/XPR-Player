import { memo } from 'react'

import styled from 'styled-components'

import { ScreenPreview } from 'components/ScreenPreview'

import { ProgramScreensInfo } from 'types'

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`
export type ScreensListProps = {
  programScreens: ProgramScreensInfo[]
}
export const ScreensListRaw = ({ programScreens }: ScreensListProps) => {
  return (
    <StyledContainer>
      {programScreens.map((screen, idx) => {
        return <ScreenPreview screenId={idx} title={screen.title} key={idx} />
      })}
    </StyledContainer>
  )
}

export const ScreensList = memo(ScreensListRaw)
