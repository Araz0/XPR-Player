import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { AddBox, Edit, EditOff, Save } from '@mui/icons-material'
import { Typography, Divider, TextField, IconButton } from '@mui/material'

import { useProgram } from '../../hooks'
import { ProgramType, SegmentType } from '../../types'
import { generateNewId, getIntroSegment } from '../../utils'
import { EditableLabel } from '../EditableLabel'
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
const StyledTitleContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  h6 {
    margin: 0;
  }
`
export type TreeListProps = {
  program: ProgramType
}
export const TreeListRaw = ({ program }: TreeListProps) => {
  const { addSegment, updateProgramTitle } = useProgram()
  const input1Ref = useRef<HTMLInputElement>()
  const titleRef = useRef<HTMLInputElement>()
  const [canEditTitle, setCanEditTitle] = useState<boolean>(false)
  const [introSegment, setIntroSegment] = useState<SegmentType | undefined>(
    undefined
  )

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

  const handleUpdateTitle = useCallback(() => {
    if (!titleRef.current?.value) return
    updateProgramTitle(titleRef.current?.value)
    setCanEditTitle(!canEditTitle)
  }, [canEditTitle, updateProgramTitle])

  useEffect(() => {
    const intro = getIntroSegment(program.segments)
    if (!intro) return
    setIntroSegment(intro)
  }, [program])

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
      <StyledTitleContainer>
        <EditableLabel
          inputRef={titleRef}
          canEdit={canEditTitle}
          text={program.title}
          placeHolder={'Program Title'}
          typographyVariant={'h6'}
        />
        {canEditTitle && (
          <IconButton onClick={handleUpdateTitle} size="small">
            <Save />
          </IconButton>
        )}
        <IconButton onClick={() => setCanEditTitle(!canEditTitle)} size="small">
          {canEditTitle ? <EditOff /> : <Edit />}
        </IconButton>
      </StyledTitleContainer>

      <Divider />
      <div className="familyTree">
        <StyledUl>
          <TreeItem segmentId={introSegment.id}></TreeItem>
        </StyledUl>
      </div>
    </>
  )
}

export const TreeList = memo(TreeListRaw)
