import { memo, useCallback } from 'react'

import styled from 'styled-components'

import {
  Moving,
  PlayArrowOutlined,
  ReplayOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { useCheckUserAuth } from 'hooks/useCheckUserAuth'

import {
  AdminPageWrapper,
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

  > :last-child {
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

export const AdminPageRaw = () => {
  useCheckUserAuth()

  const selectedProgram = useAdminStore((s) => s.selectedProgram)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  const logsArray = useAdminStore((s) => s.logsArray)
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

      {selectedProgram !== undefined && (
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
      )}
    </AdminPageWrapper>
  )
}

export const AdminPage = memo(AdminPageRaw)
