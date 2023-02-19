import { memo, useCallback } from 'react'

import styled from 'styled-components'

import { Typography } from '@mui/material'

import { useProgram } from '../../hooks'
import { SegmentType } from '../../types'
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
const StyledActionsContainer = styled.div`
  position: absolute;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
`

export type SegmentScreensProps = {
  segment: SegmentType
  canEdit: boolean
}
export const SegmentScreensRaw = ({
  segment,
  canEdit = false,
}: SegmentScreensProps) => {
  const { removeSegmentScreen } = useProgram()
  const handleDeleteScreen = useCallback(
    (screenId: number) => {
      removeSegmentScreen(segment, screenId)
    },
    [removeSegmentScreen, segment]
  )
  return (
    <>
      <Typography variant="overline" lineHeight={1} gutterBottom>
        screens:
      </Typography>
      <StyledContainer>
        {segment.screens.map((screen, idx) => {
          return (
            <StyledVideoContainer key={idx}>
              {canEdit && (
                <StyledActionsContainer>
                  <SmallIconButton
                    onClick={() => alert(screen.title)}
                    icon={iconTypes.INFO}
                  />
                  <SmallIconButton
                    onClick={() => handleDeleteScreen(screen.id)}
                    icon={iconTypes.DELETE}
                  />
                </StyledActionsContainer>
              )}
              <StyledScreenVideo src={screen.mediaSrc} controls />
            </StyledVideoContainer>
          )
        })}
      </StyledContainer>
    </>
  )
}
export const SegmentScreens = memo(SegmentScreensRaw)
