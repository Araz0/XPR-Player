import { memo, useCallback } from 'react'

import styled from 'styled-components'

import {
  AccountTree,
  Backspace,
  ControlCamera,
  PlayArrow,
  RestartAlt,
  Pause,
} from '@mui/icons-material'
import { Button, IconButton, Tooltip, Typography } from '@mui/material'

import { useSocketService } from 'services'

import {
  AdminPageWrapper,
  LoadingAnimation,
  LoadLocalProgramButton,
  ProgramScreens,
  ProgramsList,
} from '../../components'
import { useAdminStore } from '../../stores'

const StyledActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`

export const AdminPageRaw = () => {
  const selectedProgram = useAdminStore((s) => s.selectedProgram)
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
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
      {selectedProgram !== undefined ? (
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
            <Button
              variant="contained"
              onClick={handelSendProgram}
              startIcon={<AccountTree />}
            >
              Send Program
            </Button>

            <Button
              variant="contained"
              onClick={socketService.emmitToggleShowControls}
              startIcon={<ControlCamera />}
            >
              Toggle Show Controls
            </Button>
            <Button
              variant="contained"
              onClick={socketService.emmitStartProgram}
              startIcon={<PlayArrow />}
            >
              Start Program
            </Button>
            <Button
              variant="contained"
              onClick={socketService.emmitPauseProgram}
              startIcon={<Pause />}
            >
              Pause Program
            </Button>
            <Button
              variant="contained"
              onClick={socketService.emmitResetProgram}
              startIcon={<RestartAlt />}
            >
              Reset Program
            </Button>
          </StyledActionsContainer>
          <ProgramScreens />
        </>
      ) : !loadedPrograms ? (
        <LoadingAnimation />
      ) : (
        <ProgramsList programs={loadedPrograms} />
      )}
    </AdminPageWrapper>
  )
}

export const AdminPage = memo(AdminPageRaw)
