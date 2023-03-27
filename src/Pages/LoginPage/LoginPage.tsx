import { memo, useCallback, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { TextField, Typography } from '@mui/material'

import { CenterdContainer, MainButton, MainButtonVariants } from 'components'
import { useSupabase } from 'hooks'
import { useAdminStore } from 'stores'

const StyledButtonscontainer = styled.div`
  display: flex;
  gap: 15px;
`
const StyledInputContainer = styled.div`
  max-width: 413px;
`

export const LoginPageRaw = () => {
  const navigate = useNavigate()
  const { signInViaMagicLink } = useSupabase()
  const emailRef = useRef<HTMLInputElement>()
  const userIsLoggedIn = useAdminStore((s) => s.userIsLoggedIn)

  useEffect(() => {
    if (userIsLoggedIn) {
      navigate('/')
    }
  }, [navigate, userIsLoggedIn])

  const handleRequestLogin = useCallback(async () => {
    const value = emailRef.current?.value
    if (!value) return
    const isValid = value.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    if (isValid) {
      signInViaMagicLink(value)
    }
  }, [signInViaMagicLink])

  return (
    <CenterdContainer>
      <StyledInputContainer>
        <Typography variant="h6" align="center">
          Login to XPR
        </Typography>
        <br />
        <Typography variant="subtitle1">
          Enter your email and click “Send Login Link” to receive a Magic Link
          to access all the XPR features.
        </Typography>
      </StyledInputContainer>

      <TextField
        inputRef={emailRef}
        placeholder={'example: your@email.com'}
        size="small"
      />
      <StyledButtonscontainer>
        <MainButton
          variant={MainButtonVariants.PRIMARY}
          onClick={handleRequestLogin}
        >
          Send Login Link
        </MainButton>
        <MainButton
          variant={MainButtonVariants.SECONDARY}
          onClick={() => navigate('/')}
        >
          Go Back to Menu
        </MainButton>
      </StyledButtonscontainer>
    </CenterdContainer>
  )
}

export const LoginPage = memo(LoginPageRaw)
