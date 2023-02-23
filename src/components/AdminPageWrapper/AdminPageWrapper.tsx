import { memo, useCallback } from 'react'

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
  children: React.ReactNode
}
export const AdminPageWrapperRaw = ({ children }: AdminPageWrapperProps) => {
  const { userIsLoggedIn, signInViaMagicLink, signOut } = useSupabase()

  const handleRequestLogin = useCallback(async () => {
    await signInViaMagicLink('alhamdani.araz@gmail.com')
  }, [signInViaMagicLink])

  const handleRequestLogout = useCallback(async () => {
    await signOut()
  }, [signOut])

  return (
    <StyledPageContainer>
      <StyledTopNav>
        <Typography variant="h4">---</Typography>
        <StyledTopActionsContainer>
          <Button onClick={() => alert('nav')}>Admin Page</Button>
          <Button onClick={() => alert('nav')}>Create New Program</Button>
        </StyledTopActionsContainer>
      </StyledTopNav>

      <StyledSideNav>
        <StyledSymbolContainer>
          <Typography variant="h5">Admin Panel</Typography>
        </StyledSymbolContainer>
        <Divider />
        <StyledSideButton onClick={() => alert('nav')} startIcon={<Home />}>
          Home
        </StyledSideButton>
        <StyledSideButton
          onClick={() => alert('nav')}
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
