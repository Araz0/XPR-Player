import { useEffect, useState } from 'react'

import { useSupabase } from '../../hooks'

export const LoginForm = () => {
  const { supabaseClient, getUserData } = useSupabase()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getUserData()
  }, [getUserData])

  const signInWithGitHub = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github',
    })
    if (error) {
      setError(error.message)
    }
    alert(JSON.stringify(data))
  }
  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) {
      setError(error.message)
    }
  }

  const loginViaMagicLink = async () => {
    const mail = 'alhamdani.araz@gmail.com'
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email: mail,
    })
    console.log(
      '🚀 ~ file: LoginForm.tsx:32 ~ loginViaMagicLink ~ error:',
      error
    )
    console.log('🚀 ~ file: LoginForm.tsx:34 ~ loginViaMagicLink ~ data:', data)
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <button onClick={signInWithGitHub}>Sign in with GitHub</button>
      <button onClick={loginViaMagicLink}>Sign in Via Magic Link</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
