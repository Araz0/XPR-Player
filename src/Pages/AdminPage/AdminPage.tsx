import { memo, useCallback } from 'react'

import styled from 'styled-components'

import {
  Moving,
  PauseOutlined,
  PlayArrowOutlined,
  ReplayOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { useCheckUserAuth } from 'hooks/useCheckUserAuth'

import {
  AdminPageWrapper,
  MainButton,
  MainButtonVariants,
  ProgramsListDropdown,
  ScreensList,
} from 'components'
import { useSocketService } from 'services'
import { useAdminStore } from 'stores'

const StyledActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  margin-top: 25px;

  > :last-child {
    margin-left: auto;
  }
`

export const AdminPageRaw = () => {
  useCheckUserAuth()

  const selectedProgram = useAdminStore((s) => s.selectedProgram)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  const { socketService } = useSocketService()

  const handelSendProgram = useCallback(() => {
    if (!selectedProgram) return
    socketService.emmitProgram(selectedProgram)
  }, [selectedProgram, socketService])

  return (
    <AdminPageWrapper>
      {loadedPrograms && <ProgramsListDropdown programs={loadedPrograms} />}

      {selectedProgram !== undefined && (
        <>
          <StyledActionsContainer>
            <MainButton
              variant={MainButtonVariants.PRIMARY}
              onClick={handelSendProgram}
              width={'fit-content'}
              startIcon={<Moving />}
            >
              Send
            </MainButton>

            <MainButton
              variant={MainButtonVariants.PRIMARY}
              onClick={socketService.emmitStartProgram}
              width={'fit-content'}
              startIcon={<PlayArrowOutlined />}
            >
              Start
            </MainButton>
            <MainButton
              variant={MainButtonVariants.PRIMARY}
              onClick={socketService.emmitPauseProgram}
              width={'fit-content'}
              startIcon={<PauseOutlined />}
            >
              Pause
            </MainButton>
            <MainButton
              variant={MainButtonVariants.PRIMARY}
              onClick={socketService.emmitResetProgram}
              width={'fit-content'}
              startIcon={<ReplayOutlined />}
            >
              Reset
            </MainButton>

            <MainButton
              variant={MainButtonVariants.PRIMARY}
              width={'fit-content'}
              onClick={socketService.emmitToggleShowControls}
              startIcon={<SettingsOutlined />}
            >
              Toggle Controls
            </MainButton>
          </StyledActionsContainer>
          <ScreensList programScreens={selectedProgram.screensInfo} />
        </>
      )}
    </AdminPageWrapper>
  )
}

export const AdminPage = memo(AdminPageRaw)
