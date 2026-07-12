import { createContext, useContext, useRef, useState } from 'react'
import Drawer from '../components/Drawer.jsx'
import ClubModal from '../components/ClubModal.jsx'

const OverlayContext = createContext(null)

// Centralizes drawer/club-modal state so any section (curriculum, pathways,
// student life) can open them without prop-drilling through the whole tree.
export function OverlayProvider({ children }) {
  const [moduleCode, setModuleCode] = useState(null)
  const [club, setClub] = useState(null)
  const openerRef = useRef(null)

  function openDrawer(code) {
    setModuleCode((current) => (current === code ? null : code))
  }
  function closeDrawer() {
    setModuleCode(null)
  }

  function openClubModal(c, opener) {
    openerRef.current = opener || null
    setClub(c)
  }
  function closeClubModal() {
    setClub(null)
  }

  return (
    <OverlayContext.Provider value={{ moduleCode, openDrawer, closeDrawer, club, openClubModal, closeClubModal }}>
      {children}
      <Drawer moduleCode={moduleCode} onClose={closeDrawer} />
      <ClubModal club={club} onClose={closeClubModal} openerRef={openerRef} />
    </OverlayContext.Provider>
  )
}

export function useOverlay() {
  const ctx = useContext(OverlayContext)
  if (!ctx) throw new Error('useOverlay must be used within OverlayProvider')
  return ctx
}
