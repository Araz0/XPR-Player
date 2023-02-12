import create from 'zustand'

export type AdminState = {
  canEditTreeMap: boolean
  setCanEditTreeMap: (canEditTreeMap: boolean) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  canEditTreeMap: true,
  setCanEditTreeMap: (canEditTreeMap: boolean) =>
    set(() => ({ canEditTreeMap })),
}))
