import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { NoteAdd, AddBox } from '@mui/icons-material'
import { Typography, Divider, TextField, IconButton } from '@mui/material'

import { useProgram } from '../../hooks'
import { useAdminStore } from '../../stores'
import { SegmentType } from '../../types'
import { generateNewId, getIntroSegment } from '../../utils'
import { TreeItem } from '../TreeItem'

import './style.css'

const StyledUl = styled.ul`
  padding-bottom: 50px;
`
const StyledActionsContainer = styled.div`
  max-width: 720px;
  margin-inline: auto;
  margin-top: 100px;
`

export const TreeListRaw = () => {
  const { addSegment } = useProgram()
  const input1Ref = useRef<HTMLInputElement>()
  const program = useAdminStore((s) => s.program)
  const setProgram = useAdminStore((s) => s.setProgram)

  const [introSegment, setIntroSegment] = useState<SegmentType | undefined>(
    undefined
  )

  const handleCreateProgram = useCallback(() => {
    setProgram({
      id: generateNewId(),
      title: input1Ref.current?.value || 'New Program',
      segments: [],
    })
  }, [setProgram])

  const handleIntroSegment = useCallback(() => {
    const introSegment = {
      id: generateNewId(),
      title: input1Ref.current?.value || 'Intro Segment',
      screens: [],
      description: '',
      introSegment: true,
    }
    addSegment(introSegment)
    setIntroSegment(introSegment)
  }, [addSegment])

  useEffect(() => {
    if (!program) return
    const intro = getIntroSegment(program.segments)
    if (!intro) return
    setIntroSegment(intro)
  }, [program])

  if (!program)
    return (
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
    )
  if (!introSegment)
    return (
      <StyledActionsContainer>
        <Typography variant="h6">Create the Intro Segment</Typography>
        <Divider />
        <br />
        <TextField inputRef={input1Ref} placeholder={'Intro segment title'} />
        <IconButton onClick={handleIntroSegment}>
          <AddBox />
        </IconButton>
      </StyledActionsContainer>
    )
  return (
    <>
      <div className="familyTree">
        <StyledUl>
          <TreeItem segmentId={introSegment.id}></TreeItem>
        </StyledUl>
      </div>
    </>
  )
}

export const TreeList = memo(TreeListRaw)
