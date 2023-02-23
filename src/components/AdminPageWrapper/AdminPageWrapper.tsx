import { memo, ReactNode, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { AccountTree, Home, Login, Logout } from '@mui/icons-material'
import { Button, Divider, Typography } from '@mui/material'

import { useSupabase } from '../../hooks'

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
  const { userIsLoggedIn, signInViaMagicLink, signOut } = useSupabase()
  const navigate = useNavigate()

  const handleRequestLogin = useCallback(async () => {
    await signInViaMagicLink('alhamdani.araz@gmail.com')
  }, [signInViaMagicLink])

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
          <Typography variant="h5">Admin Panel</Typography>
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
        {userIsLoggedIn ? (
          <StyledSideButton
            onClick={handleRequestLogout}
            startIcon={<Logout />}
          >
            Logout
          </StyledSideButton>
        ) : (
          <StyledSideButton onClick={handleRequestLogin} startIcon={<Login />}>
            Login
          </StyledSideButton>
        )}
      </StyledSideNav>
      <StyledContentWrapper>{children}</StyledContentWrapper>
    </StyledPageContainer>
  )
}
export const AdminPageWrapper = memo(AdminPageWrapperRaw)
