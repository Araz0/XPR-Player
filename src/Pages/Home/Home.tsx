import { memo } from 'react'

import { useNavigate } from 'react-router-dom'

import { CenterdContainer, MainButton, MainButtonVariants } from 'components'

export const HomeRaw = () => {
  const navigate = useNavigate()
  return (
    <CenterdContainer>
      <MainButton
        variant={MainButtonVariants.PRIMARY}
        onClick={() => navigate('/admin')}
      >
        Admin Page
      </MainButton>
      <MainButton
        variant={MainButtonVariants.PRIMARY}
        onClick={() => navigate('/screen/0')}
      >
        Screen
      </MainButton>
      <MainButton
        variant={MainButtonVariants.PRIMARY}
        onClick={() => navigate('/selection')}
      >
        Screen Selection
      </MainButton>
    </CenterdContainer>
  )
}

export const Home = memo(HomeRaw)
