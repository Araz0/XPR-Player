import { create } from 'zustand'

import { ProgramType } from '../../types'

export type AdminState = {
  canEditTreeMap: boolean
  setCanEditTreeMap: (canEditTreeMap: boolean) => void

  program: ProgramType | undefined
  setProgram: (program: ProgramType) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  canEditTreeMap: true,
  setCanEditTreeMap: (canEditTreeMap: boolean) =>
    set(() => ({ canEditTreeMap })),

  program: undefined,
  setProgram: (program: ProgramType) => set(() => ({ program })),
}))
