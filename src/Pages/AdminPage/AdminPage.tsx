import { memo, useCallback } from 'react'

import styled from 'styled-components'

import {
  Moving,
  PlayArrowOutlined,
  ReplayOutlined,
  SettingsOutlined,
  Fingerprint,
} from '@mui/icons-material'

import {
  AdminPageWrapper,
  LoadingAnimation,
  LogsList,
  MainButton,
  MainButtonVariants,
  ProgramsListDropdown,
  ScreensList,
} from 'components'
import { useSocketService } from 'services'
import { useAdminStore } from 'stores'
import { downloadJson } from 'utils'

const StyledActionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;

  > :nth-last-child(2) {
    margin-left: auto;
  }
`

const StyledContainer = styled.div`
  display: flex;
  gap: 25px;
  justify-content: space-between;
  margin-top: 25px;
  flex-wrap: wrap;
`

const StyledLoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 25px;
`

export const AdminPageRaw = () => {
  const selectedProgram = useAdminStore((s) => s.selectedProgram)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  const logsArray = useAdminStore((s) => s.logsArray)
  const userIsLoggedIn = useAdminStore((s) => s.userIsLoggedIn)

  const setLogsArray = useAdminStore((s) => s.setLogsArray)

  const { socketService } = useSocketService()

  const handleSendProgram = useCallback(() => {
    if (!selectedProgram) return
    socketService.emmitProgram(selectedProgram)
  }, [selectedProgram, socketService])

  const handleClearLogs = useCallback(() => {
    setLogsArray([])
  }, [setLogsArray])

  const handleDownloadLogs = useCallback(() => {
    downloadJson(logsArray, `event_logs_${Date.now()}`)
  }, [logsArray])

  return (
    <AdminPageWrapper>
      {loadedPrograms && <ProgramsListDropdown programs={loadedPrograms} />}

      {selectedProgram !== undefined ? (
        <StyledContainer>
          <div>
            <StyledActionsContainer>
              <MainButton
                variant={MainButtonVariants.PRIMARY}
                onClick={handleSendProgram}
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
                onClick={socketService.emmitResetProgram}
                width={'fit-content'}
                startIcon={<ReplayOutlined />}
              >
                Reset
              </MainButton>

              <MainButton
                variant={MainButtonVariants.PRIMARY}
                width={'fit-content'}
                onClick={socketService.emmitIdentifyScreens}
                startIcon={<Fingerprint />}
              >
                Identify Screens
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
            <ScreensList
              programScreens={selectedProgram.screensInfo}
              socketService={socketService}
            />
          </div>
          <LogsList
            logs={logsArray}
            onResetClick={handleClearLogs}
            onDownloadClick={handleDownloadLogs}
          />
        </StyledContainer>
      ) : loadedPrograms ? (
        <code>Select a program first...</code>
      ) : userIsLoggedIn ? (
        <StyledLoadingWrapper>
          <LoadingAnimation />
        </StyledLoadingWrapper>
      ) : (
        <StyledLoadingWrapper>
          <span>Login to see online saved programs</span>
        </StyledLoadingWrapper>
      )}
    </AdminPageWrapper>
  )
}

export const AdminPage = memo(AdminPageRaw)
