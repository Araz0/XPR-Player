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

import {
  AdminPageWrapper,
  LoadingAnimation,
  LoadLocalProgramButton,
  ProgramsList,
} from '../../components'
import { useSocketService } from '../../hooks'
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
  const {
    emmitProgram,
    emmitStartProgram,
    emmitPauseProgram,
    emmitResetProgram,
    emmitToggleShowControls,
  } = useSocketService()

  const handelSendProgram = useCallback(() => {
    if (!selectedProgram) return
    emmitProgram(selectedProgram)
  }, [emmitProgram, selectedProgram])

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
              onClick={emmitToggleShowControls}
              startIcon={<ControlCamera />}
            >
              Toggle Show Controls
            </Button>
            <Button
              variant="contained"
              onClick={emmitStartProgram}
              startIcon={<PlayArrow />}
            >
              Start Program
            </Button>
            <Button
              variant="contained"
              onClick={emmitPauseProgram}
              startIcon={<Pause />}
            >
              Pause Program
            </Button>
            <Button
              variant="contained"
              onClick={emmitResetProgram}
              startIcon={<RestartAlt />}
            >
              Reset Program
            </Button>
          </StyledActionsContainer>
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
