import { memo } from 'react'

import { useNavigate } from 'react-router-dom'

import { Person, Tv } from '@mui/icons-material'
import { Button } from '@mui/material'

import { CenterdContainer } from '../../components'

export const HomeRaw = () => {
  const navigate = useNavigate()
  return (
    <CenterdContainer>
      <Button
        variant="outlined"
        onClick={() => navigate('/admin')}
        startIcon={<Person />}
      >
        Admin Page
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate('/screen')}
        startIcon={<Tv />}
      >
        Screen
      </Button>
    </CenterdContainer>
  )
}

export const Home = memo(HomeRaw)
