import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAdminStore } from 'stores'

export function useCheckUserAuth() {
  const navigate = useNavigate()
  const userIsLoggedIn = useAdminStore((s) => s.userIsLoggedIn)

  useEffect(() => {
    if (!userIsLoggedIn) navigate('/login')
  }, [navigate, userIsLoggedIn])
}
