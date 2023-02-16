import { memo, useCallback, useEffect, useState } from 'react'

import styled from 'styled-components'

import {
  AddToQueue,
  Add,
  ExpandMore,
  ExpandLess,
  CopyAll,
} from '@mui/icons-material'
import { Box, IconButton, InputBase, Typography } from '@mui/material'

import { useProgram } from '../../hooks'
import { useAdminStore } from '../../stores'
import { ScreenType, SegmentType } from '../../types'
import { getSegmentById } from '../../utils'

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
  const { addNextSegment } = useProgram()
  const program = useAdminStore((s) => s.program)
  const [segment, setSegment] = useState<SegmentType | undefined>(undefined)
  const [showMore, setShowMore] = useState<boolean>(false)
  const canEditTreeMap = useAdminStore((s) => s.canEditTreeMap)
  const [screenSources, setScreenSources] = useState<ScreenType[]>([])

  useEffect(() => {
    if (!program) return
    const foundSegment = getSegmentById(program, segmentId)
    if (!foundSegment) return
    setSegment(foundSegment)
  }, [program, segmentId])

  const handleImportScreen = useCallback((e: any) => {
    const screen = {
      title: 'screen title',
      mediaSrc: e.target.files[0].name,
    }
    setScreenSources((prev) => [...prev, screen])
  }, [])

  const handleAddChild = useCallback(() => {
    addNextSegment(segmentId, 'new cool segment')
  }, [addNextSegment, segmentId])

  const handleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  if (!segment) return null
  return (
    <li>
      <article>
        <StyledVerticalBox>
          {canEditTreeMap ? (
            <>
              <StyledInputBase
                placeholder={'segment title'}
                defaultValue={segment.title}
              />
              <StyledInputBase
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
              {screenSources.map((screen, idx) => {
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
        </StyledVerticalBox>
        {canEditTreeMap && (
          <StyledBox>
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
            <IconButton onClick={handleShowMore}>
              {showMore ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <IconButton
              onClick={() => navigator.clipboard.writeText(segment.id)}
            >
              <CopyAll />
            </IconButton>
          </StyledBox>
        )}
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
          {segment.nextSegmentIds?.join(', ')}
        </Typography>
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
