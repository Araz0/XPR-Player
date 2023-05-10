import { memo, useCallback, useState } from 'react'

import styled from 'styled-components'

import { Add } from '@mui/icons-material'

import {
  AdminPageWrapper,
  CreateProgramForm,
  LoadingAnimation,
  LoadLocalProgramButton,
  MainButton,
  MainButtonVariants,
  Popup,
  ProgramsList,
} from 'components'
import { useAdminStore } from 'stores'

const StyledActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
  margin-bottom: 15px;
`
const StyledLoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`
export const ProgramsPageRaw = () => {
  const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  const userIsLoggedIn = useAdminStore((s) => s.userIsLoggedIn)

  const handleOnCreateNewClick = useCallback(() => {
    // navigate('/admin/create')
    setShowCreatePopup(true)
  }, [])
  return (
    <AdminPageWrapper>
      <StyledActionsContainer>
        <MainButton
          onClick={handleOnCreateNewClick}
          width={'fit-contnet'}
          startIcon={<Add />}
          variant={MainButtonVariants.PRIMARY}
        >
          New Program
        </MainButton>
        <LoadLocalProgramButton />
      </StyledActionsContainer>
      {loadedPrograms ? (
        <ProgramsList programs={loadedPrograms} />
      ) : !userIsLoggedIn ? (
        <StyledLoadingWrapper>
          <span>Login to see online saved programs</span>
        </StyledLoadingWrapper>
      ) : (
        <StyledLoadingWrapper>
          <LoadingAnimation />
        </StyledLoadingWrapper>
      )}
      {showCreatePopup && (
        <Popup
          onClose={() => setShowCreatePopup(false)}
          header="New Program"
          bodyText="Fill up the information and submit to continue creating the program."
          fullWidth={true}
        >
          <CreateProgramForm />
        </Popup>
      )}
    </AdminPageWrapper>
  )
}
export const ProgramsPage = memo(ProgramsPageRaw)
