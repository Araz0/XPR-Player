import { memo, useCallback, useRef } from 'react'

import styled from 'styled-components'

import { Close, Send } from '@mui/icons-material'
import { Divider, IconButton, TextField, Typography } from '@mui/material'

import { useSupabase } from '../../hooks'
import { Popup } from '../Popup'

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export type LoginPopupProps = {
  onClose: () => void
}
export const LoginPopupRaw = ({ onClose }: LoginPopupProps) => {
  const { signInViaMagicLink } = useSupabase()
  const emailRef = useRef<HTMLInputElement>()

  const handleRequestLogin = useCallback(async () => {
    if (emailRef.current?.value) {
      signInViaMagicLink(emailRef.current?.value)
    }
    onClose()
  }, [onClose, signInViaMagicLink])

  return (
    <Popup onClose={onClose}>
      <StyledHeaderContainer>
        <Typography variant="h6">Login Email</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </StyledHeaderContainer>
      <Divider />
      <Typography variant="subtitle1">
        We will send you an email with the login magic link
      </Typography>
      <TextField inputRef={emailRef} placeholder={'login email'} size="small" />
      <IconButton onClick={handleRequestLogin}>
        <Send />
      </IconButton>
    </Popup>
  )
}

export const LoginPopup = memo(LoginPopupRaw)
