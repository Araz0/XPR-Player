import { memo } from 'react'

import { Virtuoso } from 'react-virtuoso'
import styled from 'styled-components'

import { DownloadOutlined, ReplayOutlined } from '@mui/icons-material'
import { LabelSpan } from 'components/LabelSpan'
import { MainButton, MainButtonVariants } from 'components/MainButton'
import {
  BACKGROUND_COLOR_SECONDERY,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  WHITE_COLOR,
} from 'constants/styles'

import { EventLog } from 'types'

const StyledListContainer = styled.div`
  height: 100%;
  display: flex;
  min-width: 275px;
  flex-direction: column;
  gap: 20px;
`
const StyledLogItem = styled.span`
  color: ${WHITE_COLOR};
  span:first-child {
    font-weight: bold;
    color: ${PRIMARY_COLOR};
  }
  span:nth-child(2) {
    color: ${SECONDARY_COLOR};
  }
`

const StyledActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  > :first-child {
    margin-right: auto;
  }
`
const StyledVertuosoContainer = styled.div`
  background-color: ${BACKGROUND_COLOR_SECONDERY};
  border-radius: 10px;
  padding: 10px;
`

export type LogsListProps = {
  logs: EventLog[]
  onResetClick: () => void
  onDownloadClick: () => void
}
export const LogsListRaw = ({
  logs,
  onResetClick,
  onDownloadClick,
}: LogsListProps) => {
  return (
    <StyledListContainer>
      <StyledActionsContainer>
        <LabelSpan>Logs in ms</LabelSpan>
        <MainButton
          variant={MainButtonVariants.PRIMARY}
          onClick={onDownloadClick}
          width={'fit-content'}
          startIcon={<DownloadOutlined />}
        />
        <MainButton
          onClick={onResetClick}
          width={'fit-content'}
          startIcon={<ReplayOutlined />}
          variant={MainButtonVariants.PRIMARY}
        />
      </StyledActionsContainer>
      <StyledVertuosoContainer>
        <Virtuoso
          style={{ height: '400px' }}
          totalCount={logs.length}
          itemContent={(i) => (
            <StyledLogItem>
              <span>{logs[i].event}:</span>

              {` ${String(logs[i].timestamp).slice(-3)} `}

              {logs[i - 1] && logs[i].event === logs[i - 1].event && (
                <span>(+{logs[i].timestamp - logs[i - 1].timestamp})</span>
              )}
            </StyledLogItem>
          )}
          followOutput
        />
      </StyledVertuosoContainer>
    </StyledListContainer>
  )
}

export const LogsList = memo(LogsListRaw)
