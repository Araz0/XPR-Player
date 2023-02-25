import { memo } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Person, Tv } from '@mui/icons-material'
import { Button } from '@mui/material'

const StyledCenterContainer = styled.div`
  flex: 1;
  display: grid;
  justify-items: center;
  align-items: center;
`

const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  width: fit-content;
  height: fit-content;
`

export const HomeRaw = () => {
  const navigate = useNavigate()
  return (
    <StyledCenterContainer>
      <StyledActionsContainer>
        <Button
          variant="outlined"
          onClick={() => navigate('/admin')}
          startIcon={<Person />}
        >
          Admin Page
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/screen/0')}
          startIcon={<Tv />}
        >
          Screen
        </Button>
      </StyledActionsContainer>
    </StyledCenterContainer>
  )
}

export const Home = memo(HomeRaw)
