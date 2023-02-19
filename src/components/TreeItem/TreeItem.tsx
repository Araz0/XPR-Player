import { memo, useCallback, useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

import {
  AddToQueue,
  Add,
  ExpandMore,
  ExpandLess,
  CopyAll,
  Edit,
  Save,
  Delete,
} from '@mui/icons-material'
import { Box, IconButton, InputBase, Typography } from '@mui/material'

import { useProgram } from '../../hooks'
import { useAdminStore } from '../../stores'
import { SegmentType } from '../../types'

const StyledInputBase = styled(InputBase)`
  font-size: 14px;
  border: 1px solid #666;
  border-radius: 4px;
  padding: 0 3px;
  color: #eee;
`
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
  segmentId: string
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
        title: 'screen title',
        mediaSrc: e.target.files[0].name,
      }
      addScreenToSegment(segmentId, screen)
    },
    [addScreenToSegment, segmentId]
  )

  const handleAddChild = useCallback(() => {
    addNextSegment(segmentId, 'new cool segment')
  }, [addNextSegment, segmentId])

  const handleToggleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  const handleToggleEdit = useCallback(() => {
    setCanEdit(!canEdit)
  }, [canEdit])

  const handleSave = useCallback(() => {
    const title = titleRef.current?.value
    const description = descriptionRef.current?.value
    if (!segment || !title) return
    const updatedSeg = {
      ...segment,
      title: title,
      description: description,
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
          {canEdit ? (
            <>
              <StyledInputBase
                inputRef={titleRef}
                placeholder={'segment title'}
                defaultValue={segment.title}
              />
              <StyledInputBase
                inputRef={descriptionRef}
                placeholder={'segment description'}
                defaultValue={segment.description && segment.description}
              />
            </>
          ) : (
            <>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                lineHeight={1}
              >
                {segment.title}
              </Typography>
              {segment.description && (
                <Typography variant="overline" display="block" gutterBottom>
                  {segment.description || 'no description'}
                </Typography>
              )}
            </>
          )}
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
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                lineHeight={1}
              >
                {segment.id}
              </Typography>
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                lineHeight={1}
              >
                {segment.nextSegmentIds
                  ? segment.nextSegmentIds.join(', ')
                  : ' - '}
              </Typography>
            </Box>
          )}
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
                <AddToQueue />
              </IconButton>
              <IconButton onClick={handleSave}>
                <Save />
              </IconButton>
            </>
          )}
          <IconButton onClick={handleToggleShowMore}>
            {showMore ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <IconButton onClick={() => navigator.clipboard.writeText(segment.id)}>
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
