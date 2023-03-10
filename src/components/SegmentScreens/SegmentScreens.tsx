import { memo, useCallback } from 'react'

import styled from 'styled-components'

import { Tooltip, Typography } from '@mui/material'

import { useProgram } from '../../hooks'
import { SegmentMediaType } from '../../types'
import { shiftItemLeftByIndex, shiftItemRightByIndex } from '../../utils'
import { iconTypes, SmallIconButton } from '../SmallIconButton'

const StyledScreenVideo = styled.video`
  width: 150px;
`
const StyledVideoContainer = styled.div`
  position: relative;
`
const StyledContainer = styled.div`
  position: relative;
  display: flex;
  gap: 3px;
`
const StyledRightActionsContainer = styled.div`
  position: absolute;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
`
const StyledActionsContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
`

export type SegmentScreensProps = {
  media: SegmentMediaType
  canEdit: boolean
}
export const SegmentScreensRaw = ({
  media,
  canEdit = false,
}: SegmentScreensProps) => {
  const { removeMediaScreen } = useProgram()
  const handleDeleteScreen = useCallback(
    (screenId: number) => {
      removeMediaScreen(media, screenId)
    },
    [removeMediaScreen, media]
  )
  return (
    <>
      <Typography variant="overline" lineHeight={1} gutterBottom>
        screens:
      </Typography>
      <StyledContainer>
        {media.screens.map((screen, idx) => {
          return (
            <StyledVideoContainer key={idx}>
              <StyledActionsContainer>
                <SmallIconButton
                  tooltip="More Info"
                  onClick={() => alert(screen.title)}
                  icon={iconTypes.INFO}
                />
                <Tooltip title="Screen Number">
                  <Typography>{`#${idx + 1}`}</Typography>
                </Tooltip>
              </StyledActionsContainer>
              <StyledRightActionsContainer>
                {canEdit && (
                  <SmallIconButton
                    tooltip="Delete Screen"
                    onClick={() => handleDeleteScreen(screen.id)}
                    icon={iconTypes.DELETE}
                  />
                )}
                {idx > 0 && (
                  <SmallIconButton
                    tooltip="shift left"
                    onClick={() => shiftItemLeftByIndex(media.screens, idx)}
                    icon={iconTypes.NavigateBefore}
                  />
                )}
                {idx < media.screens.length - 1 && (
                  <SmallIconButton
                    tooltip="shift right"
                    onClick={() => shiftItemRightByIndex(media.screens, idx)}
                    icon={iconTypes.NavigateNext}
                  />
                )}
              </StyledRightActionsContainer>

              <StyledScreenVideo src={screen.mediaSrc} controls />
            </StyledVideoContainer>
          )
        })}
      </StyledContainer>
    </>
  )
}
export const SegmentScreens = memo(SegmentScreensRaw)
