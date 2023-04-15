import { memo, useCallback } from 'react'

import styled from 'styled-components'

import { CenterdContainer, MainButton, MainButtonVariants } from 'components'
import { useSocketService } from 'services'

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 50px;
`

export const SegmentSelectionPageRaw = () => {
  const { socketService } = useSocketService()

  const handleClickedYes = useCallback(() => {
    socketService.emmitSelectedScreenIndex(1)
  }, [socketService])

  const handleClickedNo = useCallback(() => {
    socketService.emmitSelectedScreenIndex(0)
  }, [socketService])

  return (
    <CenterdContainer>
      <StyledButtonsContainer>
        <MainButton
          variant={MainButtonVariants.SECONDARY}
          onClick={handleClickedNo}
        >
          No
        </MainButton>
        <MainButton
          variant={MainButtonVariants.PRIMARY}
          onClick={handleClickedYes}
        >
          Yes
        </MainButton>
      </StyledButtonsContainer>
    </CenterdContainer>
  )
}

export const SegmentSelectionPage = memo(SegmentSelectionPageRaw)
