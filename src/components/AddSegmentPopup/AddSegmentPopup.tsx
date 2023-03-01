import { memo, useRef } from 'react'

import styled from 'styled-components'

import { Close, Check } from '@mui/icons-material'
import { Divider, IconButton, TextField, Typography } from '@mui/material'

import { Popup } from '../Popup'

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export type AddSegmentPopupProps = {
  segmentId: number
  onClose: () => void
}
export const AddSegmentPopupRaw = ({
  segmentId,
  onClose,
}: AddSegmentPopupProps) => {
  const titleRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()
  // const { addNextSegment } = useProgram()

  // const handleAddChild = useCallback(() => {
  //   const titleValue = titleRef.current
  //     ? titleRef.current.value
  //     : 'New Segment Title'
  //   const descriptionValue = descriptionRef.current
  //     ? descriptionRef.current.value
  //     : 'New Segment Description'
  //   // addNextSegment(segmentId, titleValue, descriptionValue)
  //   onClose()
  // }, [])

  return (
    <Popup onClose={onClose}>
      <StyledHeaderContainer>
        <Typography variant="h6">Add screen</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </StyledHeaderContainer>
      <Divider />
      <Typography variant="subtitle1">
        Segment Title and description:
      </Typography>
      <TextField
        inputRef={titleRef}
        placeholder={'Segment title'}
        size="small"
      />
      <br />
      <TextField
        inputRef={descriptionRef}
        placeholder={'Segment description'}
        size="small"
      />
      <IconButton onClick={() => alert('')}>
        <Check />
      </IconButton>
    </Popup>
  )
}
export const AddSegmentPopup = memo(AddSegmentPopupRaw)
