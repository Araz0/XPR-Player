import { memo, useCallback, useRef } from 'react'

import styled from 'styled-components'

import { NoteAdd } from '@mui/icons-material'
import { Typography, Divider, TextField, IconButton } from '@mui/material'

import { AdminPageWrapper } from '../../components'
import { useAdminStore } from '../../stores'
import { generateNewId } from '../../utils'

const StyledActionsContainer = styled.div`
  max-width: 720px;
  margin-inline: auto;
  margin-top: 100px;
`
export const CreatePageRaw = () => {
  const input1Ref = useRef<HTMLInputElement>()
  const setProgram = useAdminStore((s) => s.setProgram)

  const handleCreateProgram = useCallback(() => {
    setProgram({
      id: generateNewId(),
      title: input1Ref.current?.value || 'New Program',
      segments: [],
    })
  }, [setProgram])
  return (
    <AdminPageWrapper>
      <StyledActionsContainer>
        <Typography variant="h6">Create new Program</Typography>
        <Divider />
        <Typography variant="subtitle1">
          Please fill the input field and submit to continue creating the
          program.
        </Typography>
        <br />
        <TextField
          inputRef={input1Ref}
          placeholder={'Program title'}
          size="small"
        />
        <IconButton onClick={handleCreateProgram}>
          <NoteAdd />
        </IconButton>
      </StyledActionsContainer>
    </AdminPageWrapper>
  )
}
export const CreatePage = memo(CreatePageRaw)
