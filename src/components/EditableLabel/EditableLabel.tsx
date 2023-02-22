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
  typographyVariant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | 'inherit'
    | undefined
}
export const EditableLabelRaw = ({
  inputRef,
  canEdit,
  text,
  placeHolder,
  lineHeight,
  typographyVariant,
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
          variant={typographyVariant ? typographyVariant : 'overline'}
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
