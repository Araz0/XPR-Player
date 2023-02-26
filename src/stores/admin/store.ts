import { create } from 'zustand'

import { User } from '@supabase/supabase-js'

import { DbProgram, ProgramType } from '../../types'

export type AdminState = {
  canEditTreeMap: boolean
  setCanEditTreeMap: (canEditTreeMap: boolean) => void

  userIsLoggedIn: boolean
  setUserIsLoggedIn: (userIsLoggedIn: boolean) => void

  loggedInUser: User | undefined
  setLoggedInUser: (loggedInUser: User | undefined) => void

  program: ProgramType | undefined
  setProgram: (program: ProgramType) => void

  loadedPrograms: DbProgram[] | undefined
  setLoadedPrograms: (loadedPrograms: DbProgram[]) => void

  selectedProgram: ProgramType | undefined
  setSelectedProgram: (selectedProgram: ProgramType | undefined) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  canEditTreeMap: true,
  setCanEditTreeMap: (canEditTreeMap: boolean) =>
    set(() => ({ canEditTreeMap })),

  userIsLoggedIn: false,
  setUserIsLoggedIn: (userIsLoggedIn: boolean) =>
    set(() => ({ userIsLoggedIn })),

  loggedInUser: undefined,
  setLoggedInUser: (loggedInUser: User | undefined) =>
    set(() => ({ loggedInUser })),

  program: undefined,
  setProgram: (program: ProgramType) => set(() => ({ program })),

  loadedPrograms: undefined,
  setLoadedPrograms: (loadedPrograms: DbProgram[]) =>
    set(() => ({ loadedPrograms })),

  selectedProgram: undefined,
  setSelectedProgram: (selectedProgram: ProgramType | undefined) =>
    set(() => ({ selectedProgram })),
}))
