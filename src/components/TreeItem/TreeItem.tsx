import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import {
  QueuePlayNext,
  Add,
  ExpandMore,
  ExpandLess,
  CopyAll,
  Edit,
  Save,
  Delete,
} from '@mui/icons-material'
import { Box, IconButton, Portal } from '@mui/material'

import { useProgram } from '../../hooks'
import { useAdminStore } from '../../stores'
import { SegmentType } from '../../types'
import { EditableLabel } from '../EditableLabel'

const StyledVerticalBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2px;
`
const StyledBox = styled(Box)`
  display: flex;
`
const StyledScreenVideo = styled.video`
  width: 150px;
`
export type TreeItemProps = {
  segmentId: number
}
export const TreeItemRaw = ({ segmentId }: TreeItemProps) => {
  const titleRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLInputElement>()
  const canEditTreeMap = useAdminStore((s) => s.canEditTreeMap)
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
        <StyledVerticalBox>
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
          {showMore && (
            <Box>
              {segment.screens.map((screen, idx) => {
                return (
                  <StyledScreenVideo
                    key={idx}
                    src={`/${screen.mediaSrc}`}
                    controls
                  />
                )
              })}
            </Box>
          )}
          {showMore && <Portal />}
        </StyledVerticalBox>

        <StyledBox>
          {canEditTreeMap && (
            <IconButton onClick={handleToggleEdit}>
              <Edit />
            </IconButton>
          )}
          {canEdit && (
            <>
              <IconButton onClick={handleDelete}>
                <Delete />
              </IconButton>
              <IconButton onClick={handleAddChild}>
                <Add />
              </IconButton>
              <IconButton color="primary" component="label">
                <input
                  hidden
                  accept="video/mp4"
                  type="file"
                  onChange={handleImportScreen}
                />
                <QueuePlayNext />
              </IconButton>
              <IconButton onClick={handleSave}>
                <Save />
              </IconButton>
            </>
          )}
          <IconButton onClick={handleToggleShowMore}>
            {showMore ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <IconButton
            onClick={() => navigator.clipboard.writeText(segment.id.toString())}
          >
            <CopyAll />
          </IconButton>
        </StyledBox>
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
