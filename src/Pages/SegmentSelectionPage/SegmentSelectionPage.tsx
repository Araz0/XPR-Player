import { memo } from 'react'

import styled from 'styled-components'

import { ThumbUp, ThumbDown } from '@mui/icons-material'
import { Button } from '@mui/material'

import { CenterdContainer } from '../../components'

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 50px;
`

export const SegmentSelectionPageRaw = () => {
  return (
    <CenterdContainer>
      <StyledButtonsContainer>
        <Button
          variant="outlined"
          onClick={() => alert('0')}
          startIcon={<ThumbDown />}
        >
          No
        </Button>
        <Button
          variant="outlined"
          onClick={() => alert('1')}
          startIcon={<ThumbUp />}
        >
          Yes
        </Button>
      </StyledButtonsContainer>
    </CenterdContainer>
  )
}

export const SegmentSelectionPage = memo(SegmentSelectionPageRaw)
