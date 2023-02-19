import { memo, MutableRefObject } from 'react'

import styled from 'styled-components'

import { InputBase, Typography } from '@mui/material'

const StyledInputBase = styled(InputBase)`
  font-size: 14px;
  border: 1px solid #666;
  border-radius: 4px;
  padding: 0 3px;
  color: #eee;
`
const StyledFlexedContainer = styled.div``

export type EditableLabelProps = {
  inputRef: MutableRefObject<HTMLInputElement | undefined>
  canEdit: boolean
  text?: string
  placeHolder?: string
  lineHeight?: number
}
export const EditableLabelRaw = ({
  inputRef,
  canEdit,
  text,
  placeHolder,
  lineHeight,
}: EditableLabelProps) => {
  return (
    <StyledFlexedContainer>
      {canEdit ? (
        <StyledInputBase
          inputRef={inputRef}
          placeholder={placeHolder ? placeHolder : undefined}
          defaultValue={text}
        />
      ) : (
        <Typography
          variant="overline"
          display="block"
          lineHeight={lineHeight ? lineHeight : undefined}
          gutterBottom
        >
          {text ? text : ' - '}
        </Typography>
      )}
    </StyledFlexedContainer>
  )
}

export const EditableLabel = memo(EditableLabelRaw)
