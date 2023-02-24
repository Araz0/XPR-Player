import { memo, useCallback, useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Beenhere, Delete, Save, SaveAlt } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

import {
  AdminPageWrapper,
  LoadingAnimation,
  TreeList,
  LoadLocalProgramButton,
  ProgramsList,
} from '../../components'
import { useSupabase } from '../../hooks'
import { useAdminStore } from '../../stores'
import { saveProgramAsJson } from '../../utils'

export const ProgramsPageRaw = () => {
  const navigate = useNavigate()
  const { programId } = useParams()

  const program = useAdminStore((s) => s.program)
  const setProgram = useAdminStore((s) => s.setProgram)
  const loadedPrograms = useAdminStore((s) => s.loadedPrograms)
  const userIsLoggedIn = useAdminStore((s) => s.userIsLoggedIn)
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)

  const { getProgramById, updateProgram, deleteProgram } = useSupabase()

  useEffect(() => {
    if (!programId) return
    getProgramById(programId).then((prog) => {
      setProgram(prog)
    })
  }, [getProgramById, programId, setProgram])

  const handleDeleteProgram = useCallback(() => {
    if (!program) return
    deleteProgram(program.id)
    navigate(`/admin/programs`)
  }, [deleteProgram, navigate, program])

  const handleSaveProgramAsJson = useCallback(() => {
    if (!program) return
    saveProgramAsJson(program)
  }, [program])

  if (!programId)
    return (
      <AdminPageWrapper
        topNavHeader="programs"
        topNavActions={<LoadLocalProgramButton />}
      >
        {!userIsLoggedIn ? (
          <h3>
            User is not signed in.. please sign in to see the programs library
          </h3>
        ) : loadedPrograms === undefined ? (
          <LoadingAnimation />
        ) : (
          <ProgramsList
            programs={loadedPrograms}
            navigateToPath="/admin/programs"
          />
        )}
      </AdminPageWrapper>
    )
  if (!program) return <h1>Something went wrong loading a program</h1>
  return (
    <AdminPageWrapper
      topNavHeader="Tree map"
      topNavActions={
        <>
          <Tooltip title="Select Program">
            <IconButton onClick={() => setSelectedProgram(program)}>
              <Beenhere />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save Program as JSON">
            <IconButton onClick={handleSaveProgramAsJson}>
              <SaveAlt />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save Changes">
            <IconButton onClick={() => updateProgram(program)}>
              <Save />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Program">
            <IconButton onClick={handleDeleteProgram}>
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <TreeList program={program} />
    </AdminPageWrapper>
  )
}
export const ProgramsPage = memo(ProgramsPageRaw)
