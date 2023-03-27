import { memo, useCallback } from 'react'

import styled from 'styled-components'

import { ThumbUp, ThumbDown } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useCheckUserAuth } from 'hooks/useCheckUserAuth'

import { CenterdContainer } from 'components'
import { useSocketService } from 'services'

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 50px;
`

export const SegmentSelectionPageRaw = () => {
  const { socketService } = useSocketService()
  useCheckUserAuth()

  const handleClickedYes = useCallback(() => {
    socketService.emmitSelectedScreenIndex(1)
  }, [socketService])

  const handleClickedNo = useCallback(() => {
    socketService.emmitSelectedScreenIndex(0)
  }, [socketService])

  return (
    <CenterdContainer>
      <StyledButtonsContainer>
        <Button
          variant="outlined"
          onClick={handleClickedNo}
          startIcon={<ThumbDown />}
        >
          No
        </Button>
        <Button
          variant="outlined"
          onClick={handleClickedYes}
          startIcon={<ThumbUp />}
        >
          Yes
        </Button>
      </StyledButtonsContainer>
    </CenterdContainer>
  )
}

export const SegmentSelectionPage = memo(SegmentSelectionPageRaw)
