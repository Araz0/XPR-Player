import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { NoteAdd } from '@mui/icons-material'
import { Typography, Divider, TextField, IconButton } from '@mui/material'

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
  const titleRef = useRef<HTMLInputElement>()
  const program = useAdminStore((s) => s.program)
  const setProgram = useAdminStore((s) => s.setProgram)

  console.log('🚀 ~ file: TreeList.tsx:18 ~ TreeListRaw ~ program', program)
  const [introSegment, setIntroSegment] = useState<SegmentType | undefined>(
    undefined
  )

  const handleCreateProgram = useCallback(() => {
    setProgram({
      id: generateNewId(),
      title: titleRef.current?.value || 'New Program',
      segments: [],
    })
  }, [setProgram])

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
          please fill the input field and submit to continue creating the
          program.
        </Typography>
        <TextField
          inputRef={titleRef}
          placeholder={'program title'}
          size="small"
        />
        <IconButton onClick={handleCreateProgram}>
          <NoteAdd />
        </IconButton>
      </StyledActionsContainer>
    )
  if (!introSegment) return null
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
