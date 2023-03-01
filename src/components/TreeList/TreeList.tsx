import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { Edit, EditOff, Save } from '@mui/icons-material'
import { Divider, IconButton } from '@mui/material'

import { useProgram } from '../../hooks'
import { ProgramType, SegmentType } from '../../types'
import { EditableLabel } from '../EditableLabel'
import { TreeItem } from '../TreeItem'

import './style.css'

const StyledUl = styled.ul`
  padding-bottom: 50px;
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
  const { getProgramIntroSegment, updateProgramTitle } = useProgram()
  const titleRef = useRef<HTMLInputElement>()
  const [canEditTitle, setCanEditTitle] = useState<boolean>(false)
  const [introSegment, setIntroSegment] = useState<SegmentType | undefined>(
    undefined
  )

  const handleUpdateTitle = useCallback(() => {
    if (!titleRef.current?.value) return
    updateProgramTitle(titleRef.current?.value)
    setCanEditTitle(!canEditTitle)
  }, [canEditTitle, updateProgramTitle])

  useEffect(() => {
    const intro = getProgramIntroSegment()
    setIntroSegment(intro)
  }, [getProgramIntroSegment])

  if (!introSegment) return null
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
