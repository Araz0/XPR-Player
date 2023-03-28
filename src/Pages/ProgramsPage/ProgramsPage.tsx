import { memo } from 'react'

import styled from 'styled-components'

import { Add } from '@mui/icons-material'
import { useCheckUserAuth } from 'hooks/useCheckUserAuth'

import {
  AdminPageWrapper,
  LoadingAnimation,
  LoadLocalProgramButton,
  MainButton,
  MainButtonVariants,
  ProgramsList,
} from 'components'
import { useAdminStore } from 'stores'

const StyledActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
  margin-bottom: 15px;
`

export const ProgramsPageRaw = () => {
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  useCheckUserAuth()

  return (
    <AdminPageWrapper>
      <StyledActionsContainer>
        <MainButton
          onClick={() => alert('program')}
          width={'fit-contnet'}
          startIcon={<Add />}
          variant={MainButtonVariants.PRIMARY}
        >
          Add Program
        </MainButton>
        <LoadLocalProgramButton />
      </StyledActionsContainer>
      {!loadedPrograms ? (
        <LoadingAnimation />
      ) : (
        <ProgramsList programs={loadedPrograms} />
      )}
    </AdminPageWrapper>
  )
}
export const ProgramsPage = memo(ProgramsPageRaw)
