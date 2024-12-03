import { create } from 'zustand'

interface State {
  isSideMenuOpen: boolean

  openSideMenu: () => void
  closeSideMenu: () => void

  isSideCartOpen: boolean

  openSideCart: () => void
  closeSideCart: () => void
}

export const useUiStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  openSideMenu: () => { set({ isSideMenuOpen: true }) },
  closeSideMenu: () => { set({ isSideMenuOpen: false }) },

  isSideCartOpen: false,
  openSideCart: () => { set({ isSideCartOpen: true }) },
  closeSideCart: () => { set({ isSideCartOpen: false }) }
}))
