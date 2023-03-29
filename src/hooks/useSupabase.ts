import { useCallback, useEffect } from 'react'

import { createClient } from '@supabase/supabase-js'
import { PROGRAM_THUMBNAILS_BUCKET } from 'constants/supabase'

import { useAdminStore } from 'stores'
import { DbProgram, ProgramType } from 'types'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''

const supabaseClient = createClient(supabaseUrl, supabaseKey)

export function useSupabase() {
  const setLoadedPrograms = useAdminStore((s) => s.setLoadedPrograms)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  const loggedInUser = useAdminStore((s) => s.loggedInUser)
  const setLoggedInUser = useAdminStore((s) => s.setLoggedInUser)
  const setUserIsLoggedIn = useAdminStore((s) => s.setUserIsLoggedIn)

  const handleUploadProgramThubmnail = useCallback(
    async (event: { target: { files: any[] } }) => {
      const file = event.target.files[0]
      if (!file) return -1
      const { data, error } = await supabaseClient.storage
        .from(PROGRAM_THUMBNAILS_BUCKET)
        .upload('thumbnails', file)

      if (error) {
        console.log(error)
        return -1
      } else {
        console.log(data)
        return 1
      }
    },
    []
  )

  const loadAllPrograms = useCallback(async () => {
    const { data, error } = await supabaseClient.from('programs').select('*')
    if (error) throw error
    setLoadedPrograms(data as DbProgram[])
    return data as DbProgram[]
  }, [setLoadedPrograms])

  const insertProgram = useCallback(
    async (program: ProgramType) => {
      if (!loggedInUser) return
      const { error } = await supabaseClient.from('programs').insert({
        internal_id: program.id,
        program: program,
        user_id: loggedInUser.id,
      })

      if (error) throw error
      loadAllPrograms()
    },
    [loggedInUser, loadAllPrograms]
  )
  const getProgramById = useCallback(async (Id: string) => {
    const { data, error } = await supabaseClient
      .from('programs')
      .select('program')
      .eq('internal_id', Id)
      .single()

    if (error) throw error

    return data.program
  }, [])

  const loadProgramsByUser = useCallback(async () => {
    if (!loggedInUser) return
    const { data, error } = await supabaseClient
      .from('programs')
      .select('*')
      .eq('user_id', loggedInUser.id)

    if (error) throw error
    setLoadedPrograms(data as DbProgram[])
    return data as DbProgram[]
  }, [setLoadedPrograms, loggedInUser])

  const getUserData = useCallback(async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()
    if (!user) return
    setLoggedInUser(user)
    return user
  }, [setLoggedInUser])

  const signInViaMagicLink = useCallback(async (email: string) => {
    const { data, error } = await supabaseClient.auth.signInWithOtp({
      email: email,
    })
    if (error) throw error
    return data
  }, [])

  const signInWithGitHub = useCallback(async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'github',
    })
    if (error) throw error
    return data
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error
  }, [])

  const deleteProgram = useCallback(
    async (programId: number) => {
      if (!loggedInUser) return
      const { error } = await supabaseClient
        .from('programs')
        .delete()
        .eq('internal_id', programId)

      if (error) throw error
      loadAllPrograms()
    },
    [loggedInUser, loadAllPrograms]
  )

  const updateProgram = useCallback(async (program: ProgramType) => {
    const { error } = await supabaseClient
      .from('programs')
      .update({ program: program })
      .eq('internal_id', program.id)

    if (error) throw error
  }, [])

  useEffect(() => {
    if (!loadedPrograms) loadProgramsByUser()
  }, [loadProgramsByUser, loadedPrograms])

  useEffect(() => {
    if (!loggedInUser) {
      getUserData()
    } else {
      if (loggedInUser?.role === 'authenticated') {
        setUserIsLoggedIn(true)
      } else {
        setUserIsLoggedIn(false)
      }
    }

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (_event !== 'SIGNED_OUT') {
        // success
        setUserIsLoggedIn(true)
        setLoggedInUser(session?.user)
      } else {
        // did not work
        setUserIsLoggedIn(false)
        setLoggedInUser(undefined)
      }
    })
  }, [getUserData, loggedInUser, setLoggedInUser, setUserIsLoggedIn])

  return {
    supabaseClient,
    insertProgram,
    getProgramById,
    loadAllPrograms,
    loadProgramsByUser,
    getUserData,
    signInViaMagicLink,
    signInWithGitHub,
    signOut,
    deleteProgram,
    updateProgram,
    handleUploadProgramThubmnail,
  }
}
