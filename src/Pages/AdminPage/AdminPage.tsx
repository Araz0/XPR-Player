import { memo, useCallback } from 'react'

import styled from 'styled-components'

import {
  Backspace,
  Moving,
  PauseOutlined,
  PlayArrowOutlined,
  ReplayOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { useCheckUserAuth } from 'hooks/useCheckUserAuth'

import {
  AdminPageWrapper,
  LoadLocalProgramButton,
  MainButton,
  MainButtonVariants,
  ScreensList,
} from 'components'
import { useSocketService } from 'services'
import { useAdminStore } from 'stores'

const StyledActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 25px;
  > :last-child {
    margin-left: auto;
  }
`

export const AdminPageRaw = () => {
  useCheckUserAuth()

  const selectedProgram = useAdminStore((s) => s.selectedProgram)
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)
  const { socketService } = useSocketService()

  const handelSendProgram = useCallback(() => {
    if (!selectedProgram) return
    socketService.emmitProgram(selectedProgram)
  }, [selectedProgram, socketService])

  return (
    <AdminPageWrapper
      topNavHeader="Home"
      topNavActions={<LoadLocalProgramButton />}
    >
      {selectedProgram !== undefined && (
        <>
          <Typography variant="button">
            {`Selected Program: ${selectedProgram.title}`}
            <Tooltip title="deselect program">
              <IconButton onClick={() => setSelectedProgram(undefined)}>
                <Backspace />
              </IconButton>
            </Tooltip>
          </Typography>

          <StyledActionsContainer>
            <MainButton
              variant={MainButtonVariants.PRIMARY}
              onClick={handelSendProgram}
              width={'fit-contnet'}
              startIcon={<Moving />}
            >
              Send
            </MainButton>

            <MainButton
              variant={MainButtonVariants.PRIMARY}
              onClick={socketService.emmitStartProgram}
              width={'fit-contnet'}
              startIcon={<PlayArrowOutlined />}
            >
              Start
            </MainButton>
            <MainButton
              variant={MainButtonVariants.PRIMARY}
              onClick={socketService.emmitPauseProgram}
              width={'fit-contnet'}
              startIcon={<PauseOutlined />}
            >
              Pause
            </MainButton>
            <MainButton
              variant={MainButtonVariants.PRIMARY}
              onClick={socketService.emmitResetProgram}
              width={'fit-contnet'}
              startIcon={<ReplayOutlined />}
            >
              Reset
            </MainButton>

            <MainButton
              variant={MainButtonVariants.PRIMARY}
              width={'fit-contnet'}
              onClick={socketService.emmitToggleShowControls}
              startIcon={<SettingsOutlined />}
            >
              Toggle Controls
            </MainButton>
          </StyledActionsContainer>
          <ScreensList
            programScreens={[
              'screen #1 left screen',
              'screen #2 center screen',
              'screen #3 right screen',
            ]}
          />
        </>
      )}
    </AdminPageWrapper>
  )
}

export const AdminPage = memo(AdminPageRaw)
