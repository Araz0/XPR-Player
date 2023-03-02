import { memo } from 'react'

import styled from 'styled-components'

import { ThumbUp, ThumbDown } from '@mui/icons-material'
import { Button } from '@mui/material'

import { CenterdContainer } from '../../components'

const StyledButtonsContainer = styled.div``

export const SegmentSelectionPageRaw = () => {
  return (
    <CenterdContainer>
      <StyledButtonsContainer>
        <Button
          variant="outlined"
          onClick={() => alert('1')}
          startIcon={<ThumbUp />}
        >
          Screen
        </Button>
        <Button
          variant="outlined"
          onClick={() => alert('0')}
          startIcon={<ThumbDown />}
        >
          Screen Selection
        </Button>
      </StyledButtonsContainer>
    </CenterdContainer>
  )
}

export const SegmentSelectionPage = memo(SegmentSelectionPageRaw)
