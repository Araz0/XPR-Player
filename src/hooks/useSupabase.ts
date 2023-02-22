import { createClient } from '@supabase/supabase-js'

import { ProgramType } from '../types'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''

const supabaseClient = createClient(supabaseUrl, supabaseKey)

export function useSupabase() {
  const getData = async () => {
    const { data, error } = await supabaseClient.from('my_table').select('*')
    if (error) console.log(error)
    else console.log(data)
  }

  const saveProgram = async (program: ProgramType) => {
    const { data, error } = await supabaseClient
      .from('programs')
      .insert({ program, userId: 'user_id' })

    if (error) {
      console.log('error', error)
    } else {
      console.log('data', data)
    }
  }
  const loadProgramById = async (programId: string) => {
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
  }

  const loadAllPrograms = async () => {
    const { data, error } = await supabaseClient.from('programs').select('*')
    if (error) {
      console.log(error)
    } else {
      console.log(data)
    }
  }
  const loadProgramsByUser = async (userId: string) => {
    const { data, error } = await supabaseClient
      .from('programs')
      .select('*')
      .eq('user_id', userId)
    if (error) {
      throw error
    }
    return data
  }

  return {
    supabaseClient,
    getData,
    saveProgram,
    loadProgramById,
    loadAllPrograms,
    loadProgramsByUser,
  }
}
