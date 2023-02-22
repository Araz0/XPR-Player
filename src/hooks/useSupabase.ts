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
        console.log('🚀', _event, session?.user, session)
      } else {
        // did not work
        console.log('🚀', _event, session?.user, session)
      }
    })
  }, [])

  const saveProgram = useCallback(
    async (program: ProgramType) => {
      if (!user) return
      const { data, error } = await supabaseClient
        .from('programs')
        .insert({ program, userId: user.id })

      if (error) {
        console.log('error', error)
      } else {
        console.log('data', data)
      }
    },
    [user]
  )
  const loadProgramById = useCallback(async (programId: string) => {
    const { data, error } = await supabaseClient
      .from('programs')
      .select('program')
      .eq('program:id', programId)
      .single()
    if (error) {
      console.log('error', error)
    } else {
      console.log(data.program)
    }
  }, [])

  const loadAllPrograms = useCallback(async () => {
    const { data, error } = await supabaseClient.from('programs').select('*')
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }, [])
  const loadProgramsByUser = useCallback(async () => {
    console.log('🚀 ~ file: useSupabase.ts:65 ~ loadProgramsByUser')

    if (!user) return
    const { data, error } = await supabaseClient
      .from('programs')
      .select('*')
      .eq('user_id', user.id)
    if (error) {
      throw error
    }
    console.log(
      '🚀 ~ file: useSupabase.ts:74 ~ loadProgramsByUser ~ data:',
      data
    )
  }, [user])

  const getUserData = useCallback(async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    if (!user) return
    setUser(user)
    console.log(
      '🚀 ~ file: useSupabase.ts:64 ~ awaitsupabaseClient.auth.getUser ~ user:',
      user
    )
  }, [])

  return {
    supabaseClient,
    saveProgram,
    loadProgramById,
    loadAllPrograms,
    loadProgramsByUser,
    getUserData,
  }
}
