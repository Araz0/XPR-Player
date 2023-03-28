import { memo, ReactNode, useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Logout, Send } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Logo } from 'components/Icons'
import { MainButton } from 'components/MainButton'

import { useSupabase } from 'hooks'

import { Popup } from '../Popup'

const StyledPageContainer = styled.div`
  flex: 1;
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 50px auto;
  gap: 0px 0px;
  grid-template-areas: 'topNav' 'mainContent';
`

const StyledTopNav = styled.div`
  padding: 10px 15px;
  grid-area: topNav;
  display: flex;
  justify-content: space-between;
  height: fit-content;
  padding: 10px 15px;
`

const StyledContentWrapper = styled.div`
  margin-top: 10px;
  grid-area: mainContent;
  padding: 0 15px;
  overflow: auto;
`

const StyledSymbolContainer = styled.div`
  padding: 5px;
  text-align: center;
  width: 40px;
`
const StyledCenterActionsContainer = styled.div`
  display: flex;
  gap: 10px;
`
const StyledRightActionsContainer = styled.div`
  display: flex;
`

export type AdminPageWrapperProps = {
  children: ReactNode
}
export const AdminPageWrapperRaw = ({ children }: AdminPageWrapperProps) => {
  const navigate = useNavigate()
  const { signOut } = useSupabase()
  const [showLoginPopup, setShowLoginPopup] = useState<boolean>(false)

  const handleRequestLogout = useCallback(async () => {
    await signOut()
  }, [signOut])

  const handleOnLogoutClick = useCallback(() => {}, [])

  return (
    <StyledPageContainer>
      <StyledTopNav>
        <StyledSymbolContainer>
          <Logo />
        </StyledSymbolContainer>
        <StyledCenterActionsContainer>
          <MainButton onClick={() => navigate('/')}>Menu</MainButton>
          <MainButton onClick={() => navigate('/admin')}>Home</MainButton>
          <MainButton onClick={() => navigate('/admin/programs')}>
            Programs
          </MainButton>
        </StyledCenterActionsContainer>
        <StyledRightActionsContainer>
          <MainButton onClick={handleRequestLogout}>
            <Logout />
            Logout
          </MainButton>
        </StyledRightActionsContainer>
      </StyledTopNav>

      <StyledContentWrapper>{children}</StyledContentWrapper>
      {showLoginPopup && (
        <Popup
          onClose={() => setShowLoginPopup(false)}
          header="Confurim:"
          bodyText="Are you sure you want to log out of XPR?"
        >
          <IconButton onClick={handleOnLogoutClick}>
            <Send />
          </IconButton>
        </Popup>
      )}
    </StyledPageContainer>
  )
}
export const AdminPageWrapper = memo(AdminPageWrapperRaw)
