import { useCallback, useEffect, useState } from 'react'

import { createClient, User } from '@supabase/supabase-js'

import { ProgramType } from '../types'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''

const supabaseClient = createClient(supabaseUrl, supabaseKey)

export function useSupabase() {
  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (_event !== 'SIGNED_OUT') {
        // success
        setUser(session?.user)
      } else {
        // did not work
      }
    })
  }, [])

  const saveProgram = useCallback(
    async (program: ProgramType) => {
      if (!user) return
      const { error } = await supabaseClient
        .from('programs')
        .insert({ internal_id: program.id, program: program, user_id: user.id })

      if (error) {
        throw error
      }
    },
    [user]
  )
  const getProgramById = useCallback(async (Id: string) => {
    const { data, error } = await supabaseClient
      .from('programs')
      .select('program')
      .eq('internal_id', Id)
      .single()
    if (error) {
      throw error
    } else {
      return data.program
    }
  }, [])

  const loadAllPrograms = useCallback(async () => {
    const { data, error } = await supabaseClient.from('programs').select('*')
    if (error) {
      throw error
    } else {
      return data
    }
  }, [])
  const loadProgramsByUser = useCallback(async () => {
    if (!user) return
    const { data, error } = await supabaseClient
      .from('programs')
      .select('*')
      .eq('user_id', user.id)
    if (error) {
      throw error
    }
    return data
  }, [user])

  const getUserData = useCallback(async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    if (!user) return
    setUser(user)
    return user
  }, [])

  const loginViaMagicLink = useCallback(async (email: string) => {
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email: email,
    })
    if (error) {
      throw error
    }
    return data
  }, [])
  const signInWithGitHub = useCallback(async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github',
    })
    if (error) {
      throw error
    }
    return data
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) {
      throw error
    }
  }, [])

  return {
    supabaseClient,
    saveProgram,
    getProgramById,
    loadAllPrograms,
    loadProgramsByUser,
    getUserData,
    loginViaMagicLink,
    signInWithGitHub,
    signOut,
  }
}
