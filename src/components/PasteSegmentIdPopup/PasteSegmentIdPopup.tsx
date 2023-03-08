import { memo, useCallback, useRef } from 'react'

import styled from 'styled-components'

import { Close, Check } from '@mui/icons-material'
import { Divider, IconButton, TextField, Typography } from '@mui/material'

import { useProgram } from '../../hooks'
import { Popup } from '../Popup'

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export type PasteSegmentIdPopupProps = {
  segmentId?: number
  onClose: () => void
}
export const PasteSegmentIdPopupRaw = ({
  segmentId,
  onClose,
}: PasteSegmentIdPopupProps) => {
  const titleRef = useRef<HTMLInputElement>()
  const { addNextSegmentById } = useProgram()

  const handleAddSegmentById = useCallback(() => {
    const inputValue = titleRef.current ? parseInt(titleRef.current.value) : 0
    segmentId && addNextSegmentById(segmentId, inputValue)
    onClose()
  }, [addNextSegmentById, segmentId, onClose])

  return (
    <Popup onClose={onClose}>
      <StyledHeaderContainer>
        <Typography variant="h6">Add screen</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </StyledHeaderContainer>
      <Divider />
      <Typography variant="subtitle1">Paste The Segment ID here:</Typography>
      <TextField inputRef={titleRef} placeholder={'Segment Id'} size="small" />
      <IconButton onClick={handleAddSegmentById}>
        <Check />
      </IconButton>
    </Popup>
  )
}
export const PasteSegmentIdPopup = memo(PasteSegmentIdPopupRaw)
