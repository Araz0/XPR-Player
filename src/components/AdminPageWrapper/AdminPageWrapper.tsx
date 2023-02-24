import { memo, ReactNode, useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { AccountTree, Add, Home, Login, Logout } from '@mui/icons-material'
import { Button, Divider, Typography } from '@mui/material'

import { useSupabase } from '../../hooks'
import { LoginPopup } from '../LoginPopup'

const StyledPageContainer = styled.div`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 50px auto;
  gap: 0px 0px;
  grid-template-areas:
    'sideNav topNav   '
    'sideNav mainContent';
`

const StyledTopNav = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  grid-area: topNav;
  display: flex;
  justify-content: space-between;
  height: fit-content;
  padding: 0 15px;
`
const StyledSideNav = styled.div`
  grid-area: sideNav;
  max-width: 200px;
  background-color: rgba(0, 0, 255, 0.1);
  padding: 0px 10px;
`
const StyledContentWrapper = styled.div`
  grid-area: mainContent;
  padding: 0 15px;
`
const StyledTopActionsContainer = styled.div`
  display: flex;
  height: fit-content;
`

const StyledSideButton = styled(Button)`
  width: 100%;
  justify-content: left !important;
`

const StyledSymbolContainer = styled.div`
  padding: 5px;
  text-align: center;
`

export type AdminPageWrapperProps = {
  children: ReactNode
  topNavActions?: ReactNode
  topNavHeader?: string
}
export const AdminPageWrapperRaw = ({
  children,
  topNavHeader,
  topNavActions,
}: AdminPageWrapperProps) => {
  const { userIsLoggedIn, signOut } = useSupabase()
  const navigate = useNavigate()
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false)

  const handleRequestLogout = useCallback(async () => {
    await signOut()
  }, [signOut])

  return (
    <StyledPageContainer>
      <StyledTopNav>
        <Typography variant="h4">{topNavHeader}</Typography>
        <StyledTopActionsContainer>{topNavActions}</StyledTopActionsContainer>
      </StyledTopNav>

      <StyledSideNav>
        <StyledSymbolContainer>
          <Typography variant="h5">XPR Admin</Typography>
        </StyledSymbolContainer>
        <Divider />
        <StyledSideButton
          onClick={() => navigate('/admin')}
          startIcon={<Home />}
        >
          Home
        </StyledSideButton>
        <StyledSideButton
          onClick={() => navigate('/admin/programs')}
          startIcon={<AccountTree />}
        >
          Programs
        </StyledSideButton>
        <StyledSideButton
          onClick={() => navigate('/admin/create')}
          startIcon={<Add />}
        >
          Create Program
        </StyledSideButton>
        {userIsLoggedIn ? (
          <StyledSideButton
            onClick={handleRequestLogout}
            startIcon={<Logout />}
          >
            Logout
          </StyledSideButton>
        ) : (
          <StyledSideButton
            onClick={() => setShowLoginPopup(true)}
            startIcon={<Login />}
          >
            Login
          </StyledSideButton>
        )}
        {showLoginPopup && (
          <LoginPopup onClose={() => setShowLoginPopup(false)} />
        )}
      </StyledSideNav>
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </StyledPageContainer>
  )
}
export const AdminPageWrapper = memo(AdminPageWrapperRaw)
