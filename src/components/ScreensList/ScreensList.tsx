import { memo } from 'react'

import styled from 'styled-components'

import { ScreenPreview } from 'components/ScreenPreview'

import { ScreenService, SocketService } from 'services'
import { ProgramScreensInfo } from 'types'

const StyledContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`
export type ScreensListProps = {
  programScreens: ProgramScreensInfo[]
  socketService?: SocketService
}
export const ScreensListRaw = ({
  programScreens,
  socketService,
}: ScreensListProps) => {
  return (
    <StyledContainer>
      {programScreens.map((screen, idx) => {
        return (
          <ScreenPreview
            key={idx}
            screenId={idx}
            screenService={new ScreenService()}
            title={screen.title}
            muted={true}
            socketService={socketService}
          />
        )
      })}
    </StyledContainer>
  )
}

export const ScreensList = memo(ScreensListRaw)
