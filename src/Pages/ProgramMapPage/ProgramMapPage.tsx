import { memo, useCallback, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Beenhere, Check, Delete, Save, SaveAlt } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

import { AdminPageWrapper, Popup, TreeList } from 'components'
import { useSupabase } from 'hooks'
import { useAdminStore } from 'stores'
import { saveProgramAsJson } from 'utils'

export const ProgramMapPageRaw = () => {
  const navigate = useNavigate()

  const [showDeleteProgram, setShowDeleteProgram] = useState<boolean>(false)
  const program = useAdminStore((s) => s.program)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)

  const { updateProgram, deleteProgram, insertProgram } = useSupabase()

  const handleDeleteProgram = useCallback(() => {
    if (!program) return
    deleteProgram(program.id)
    navigate(`/admin/programs`)
  }, [deleteProgram, navigate, program])

  const handleSaveProgramAsJson = useCallback(() => {
    if (!program) return
    saveProgramAsJson(program)
  }, [program])

  const handleUpdateProgramInDb = useCallback(() => {
    if (!program) return
    const programIdExist = loadedPrograms?.some(
      (item) => item.program.id === program.id
    )
    if (programIdExist) {
      updateProgram(program)
    } else {
      insertProgram(program)
    }
  }, [insertProgram, loadedPrograms, program, updateProgram])

  const handleSettingProgramAsSelected = useCallback(() => {
    if (!program) return
    setSelectedProgram(program)
  }, [setSelectedProgram, program])

  useEffect(() => {
    if (!program) navigate('/admin/programs')
  }, [navigate, program])

  if (!program) return <h1>Something went wrong loading the program</h1>
  return (
    <AdminPageWrapper>
      <>
        <Tooltip title="Select Program">
          <IconButton onClick={handleSettingProgramAsSelected}>
            <Beenhere />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save Program as JSON">
          <IconButton onClick={handleSaveProgramAsJson}>
            <SaveAlt />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save Changes in Database">
          <IconButton onClick={handleUpdateProgramInDb}>
            <Save />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Program">
          <IconButton onClick={() => setShowDeleteProgram(true)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </>
      <TreeList program={program} />
      {showDeleteProgram && (
        <Popup
          onClose={() => setShowDeleteProgram(false)}
          header="Delete Segment"
          bodyText="Are you sure you want to delete this Program?"
        >
          <IconButton onClick={handleDeleteProgram}>
            <Check />
          </IconButton>
        </Popup>
      )}
    </AdminPageWrapper>
  )
}
export const ProgramMapPage = memo(ProgramMapPageRaw)
