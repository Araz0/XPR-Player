import { memo, useCallback, useState } from 'react'

import styled from 'styled-components'

import { AddToQueue, Add, ExpandMore, ExpandLess } from '@mui/icons-material'
import { Box, IconButton, InputBase, Typography } from '@mui/material'

import { useAdminStore } from '../../stores'
import { ScreenType, SegmentType } from '../../types'

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
  title?: string
  body?: string
  children?: JSX.Element[]
  segment?: SegmentType
}
export const TreeItemRaw = ({ title, body, children }: TreeItemProps) => {
  const [childrenE, setChildrenE] = useState<JSX.Element[]>(children || [])
  const canEditTreeMap = useAdminStore((s) => s.canEditTreeMap)
  const [showMore, setShowMore] = useState<boolean>(false)
  const [screenSources, setScreenSources] = useState<ScreenType[]>([])

  const handleAddChild = useCallback(() => {
    setChildrenE([
      ...childrenE,
      <TreeItem key={childrenE.length} title={'some item'} />,
    ])
  }, [childrenE])

  const handleImportScreen = useCallback((e: any) => {
    const screen = {
      title: 'screen title',
      mediaSrc: e.target.files[0].name,
    }
    console.log(
      '🚀 ~ file: TreeItem.tsx:47 ~ handleImportScreen ~ e.target.files[0]',
      e.target.files[0]
    )
    setScreenSources((prev) => [...prev, screen])
  }, [])

  const handleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  return (
    <li>
      <article>
        <StyledVerticalBox>
          {canEditTreeMap ? (
            <>
              <StyledInputBase
                placeholder={'segment title'}
                defaultValue={title && title}
              />
              <StyledInputBase
                placeholder={'segment description'}
                defaultValue={body && body}
              />
            </>
          ) : (
            <>
              {title && (
                <Typography
                  variant="overline"
                  display="block"
                  gutterBottom
                  lineHeight={1}
                >
                  {title}
                </Typography>
              )}
              {body && (
                <Typography variant="overline" display="block" gutterBottom>
                  {body}
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
          </StyledBox>
        )}
      </article>
      {childrenE.length > 0 && <ul>{childrenE}</ul>}
    </li>
  )
}

export const TreeItem = memo(TreeItemRaw)
