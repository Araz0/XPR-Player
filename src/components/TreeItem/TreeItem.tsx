import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import { QueuePlayNext, ExpandMore, ExpandLess } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useProgram } from '../../hooks'
import { SegmentType } from '../../types'
import { EditableLabel } from '../EditableLabel'
import { SegmentScreens } from '../SegmentScreens'
import { iconTypes, SmallIconButton } from '../SmallIconButton'

const StyledVerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
const StyledActionsContainer = styled.div`
  display: flex;
`

export type TreeItemProps = {
  segmentId: number
}
export const TreeItemRaw = ({ segmentId }: TreeItemProps) => {
  const titleRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [showMore, setShowMore] = useState<boolean>(false)
  const [segment, setSegment] = useState<SegmentType | undefined>(undefined)
  const {
    addNextSegment,
    getSegmentById,
    addScreenToSegment,
    updateSegment,
    removeSegment,
  } = useProgram()

  useEffect(() => {
    const foundSegment = getSegmentById(segmentId)
    if (!foundSegment) return
    setSegment(foundSegment)
  }, [getSegmentById, segmentId])

  const handleImportScreen = useCallback(
    (e: any) => {
      const screen = {
        id: new Date().getTime(),
        title: 'screen title',
        mediaSrc: e.target.files[0].name,
      }
      addScreenToSegment(segmentId, screen)
    },
    [addScreenToSegment, segmentId]
  )

  const handleAddChild = useCallback(() => {
    addNextSegment(segmentId, 'new cool segment', 'custom description')
  }, [addNextSegment, segmentId])

  const handleToggleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  const handleToggleEdit = useCallback(() => {
    setCanEdit(!canEdit)
  }, [canEdit])

  const handleSave = useCallback(() => {
    if (!segment) return
    const updatedSeg = {
      ...segment,
      title: titleRef.current?.value || 'No title',
      description: descriptionRef.current?.value || 'No description',
    }
    updateSegment(updatedSeg)
  }, [segment, updateSegment])

  const handleDelete = useCallback(() => {
    removeSegment(segmentId)
  }, [removeSegment, segmentId])

  if (!segment) return null
  return (
    <li>
      <article>
        <StyledVerticalContainer>
          <EditableLabel
            inputRef={titleRef}
            canEdit={canEdit}
            text={segment.title}
            placeHolder={'segment title'}
            lineHeight={1}
          />
          <EditableLabel
            inputRef={descriptionRef}
            canEdit={canEdit}
            text={segment.description}
            placeHolder={'segment description'}
          />

          {showMore && <SegmentScreens segment={segment} canEdit={canEdit} />}
        </StyledVerticalContainer>

        <StyledActionsContainer>
          <SmallIconButton onClick={handleToggleEdit} icon={iconTypes.EDIT} />
          {canEdit && (
            <>
              <SmallIconButton onClick={handleDelete} icon={iconTypes.DELETE} />
              <SmallIconButton onClick={handleAddChild} icon={iconTypes.ADD} />

              <IconButton color="primary" component="label">
                <input
                  hidden
                  accept="video/mp4"
                  type="file"
                  onChange={handleImportScreen}
                />
                <QueuePlayNext />
              </IconButton>
              <SmallIconButton onClick={handleSave} icon={iconTypes.SAVE} />
            </>
          )}
          <IconButton onClick={handleToggleShowMore}>
            {showMore ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <SmallIconButton
            onClick={() => navigator.clipboard.writeText(segment.id.toString())}
            icon={iconTypes.COPY_ALL}
          />
        </StyledActionsContainer>
      </article>
      {segment.nextSegmentIds && (
        <ul>
          {segment.nextSegmentIds?.map((id, idx) => {
            return <TreeItem key={idx} segmentId={id} />
          })}
        </ul>
      )}
    </li>
  )
}

export const TreeItem = memo(TreeItemRaw)
