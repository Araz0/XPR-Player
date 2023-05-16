import { memo, useCallback, useRef } from 'react'

import styled from 'styled-components'

import { TextField, Typography } from '@mui/material'

import { CenterdContainer, MainButton, MainButtonVariants } from 'components'

const StyledButtonscontainer = styled.div`
  display: flex;
  gap: 15px;
`
const StyledInputContainer = styled.div`
  max-width: 413px;
`
export type SocketIpPageProps = {
  onClick: (address: string) => void
}
export const SocketIpPageRaw = ({ onClick }: SocketIpPageProps) => {
  const emailRef = useRef<HTMLInputElement>()

  const handleRequestLogin = useCallback(async () => {
    const value = emailRef.current?.value
    if (!value) return
    onClick(value)
  }, [onClick])

  return (
    <CenterdContainer>
      <StyledInputContainer>
        <Typography variant="h6" align="center">
          Socket IO
        </Typography>
        <br />
        <Typography variant="subtitle1">
          If you are using this device as a control panel only, you can change
          the host Address to yours. Otherwise, Keep it as it is.
        </Typography>
      </StyledInputContainer>

      <TextField
        inputRef={emailRef}
        placeholder={'localhost or 192.168.0.110'}
        size="small"
        defaultValue={'localhost'}
      />
      <StyledButtonscontainer>
        <MainButton
          variant={MainButtonVariants.PRIMARY}
          onClick={handleRequestLogin}
        >
          Start App
        </MainButton>
      </StyledButtonscontainer>
    </CenterdContainer>
  )
}

export const SocketIpPage = memo(SocketIpPageRaw)
