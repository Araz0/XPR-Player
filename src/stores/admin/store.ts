import { create } from 'zustand'

import { User } from '@supabase/supabase-js'

import { DbProgram, EventLog, ProgramType } from 'types'

export type AdminState = {
  canEditTreeMap: boolean
  setCanEditTreeMap: (canEditTreeMap: boolean) => void

  userIsLoggedIn: boolean
  setUserIsLoggedIn: (userIsLoggedIn: boolean) => void

  loggedInUser: User | undefined
  setLoggedInUser: (loggedInUser: User | undefined) => void

  program: ProgramType | undefined
  setProgram: (program: ProgramType) => void

  logsArray: EventLog[]
  setLogsArray: (logsArray: EventLog[]) => void
  addLogToLogsArray: (log: EventLog) => void

  loadedPrograms: DbProgram[] | undefined
  setLoadedPrograms: (loadedPrograms: DbProgram[]) => void

  selectedProgram: ProgramType | undefined
  setSelectedProgram: (selectedProgram: ProgramType | undefined) => void

  socketHostIp: string
  setSocketHostIp: (socketHostIp: string) => void
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

  logsArray: [],
  setLogsArray: (logsArray: EventLog[]) => set(() => ({ logsArray })),
  addLogToLogsArray: (log: EventLog) =>
    set((state) => ({ logsArray: [...state.logsArray, log] })),

  loadedPrograms: undefined,
  setLoadedPrograms: (loadedPrograms: DbProgram[]) =>
    set(() => ({ loadedPrograms })),

  selectedProgram: undefined,
  setSelectedProgram: (selectedProgram: ProgramType | undefined) =>
    set(() => ({ selectedProgram })),

  socketHostIp: 'localhost:8000',
  setSocketHostIp: (socketHostIp: string) => set(() => ({ socketHostIp })),
}))
