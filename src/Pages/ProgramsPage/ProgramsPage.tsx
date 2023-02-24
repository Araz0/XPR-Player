import { memo, useCallback, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { Delete, Save, SaveAlt } from '@mui/icons-material'
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Tooltip,
} from '@mui/material'

import {
  AdminPageWrapper,
  LoadingAnimation,
  TreeList,
  LoadLocalProgramButton,
} from '../../components'
import { useSupabase } from '../../hooks'
import { useAdminStore } from '../../stores'
import { DbProgram } from '../../types'
import { saveProgramAsJson } from '../../utils'

const StyledProgramsListContainer = styled(List)`
  max-width: 400px;
  margin: 0 auto;
  border: 1px dashed rgba(255, 255, 255, 0.5);
  border-radius: 5px;
`

export const ProgramsPageRaw = () => {
  const navigate = useNavigate()
  const { programId } = useParams()

  const program = useAdminStore((s) => s.program)

  const {
    getProgramById,
    loadProgramsByUser,
    updateProgram,
    deleteProgram,
    userIsLoggedIn,
  } = useSupabase()

  const setProgram = useAdminStore((s) => s.setProgram)
  const [error, setError] = useState<any>()
  const [programs, setPrograms] = useState<any>()

  useEffect(() => {
    if (!programId) return
    getProgramById(programId).then((res) => {
      setProgram(res)
    })
  }, [getProgramById, programId, setProgram])

  useEffect(() => {
    loadProgramsByUser()
      .then((res) => {
        setPrograms(res)
      })
      .catch((err) => {
        setError(err)
      })
  }, [loadProgramsByUser])

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
        {error && <h3>Something went Wrong: {error}</h3>}
        {!userIsLoggedIn ? (
          <h3>
            User is not signed in.. please sign in to see the programs library
          </h3>
        ) : !programs ? (
          <LoadingAnimation />
        ) : (
          <StyledProgramsListContainer>
            {programs.map((program: DbProgram) => {
              return (
                <Tooltip
                  key={program.id}
                  title={new Date(program.internal_id).toLocaleString()}
                  placement="left"
                >
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" onClick={handleDeleteProgram}>
                        <Delete />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={() =>
                        navigate(`/admin/programs/${program.internal_id}`)
                      }
                      dense
                    >
                      <ListItemText primary={program.program.title} />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              )
            })}
          </StyledProgramsListContainer>
        )}
      </AdminPageWrapper>
    )
  if (!program) return <h1>Something went wrong loading a program</h1>
  return (
    <AdminPageWrapper
      topNavHeader="Tree map"
      topNavActions={
        <>
          <IconButton onClick={handleSaveProgramAsJson}>
            <SaveAlt />
          </IconButton>
          <IconButton onClick={() => updateProgram(program)}>
            <Save />
          </IconButton>
          <IconButton onClick={handleDeleteProgram}>
            <Delete />
          </IconButton>
        </>
      }
    >
      <TreeList program={program} />
    </AdminPageWrapper>
  )
}
export const ProgramsPage = memo(ProgramsPageRaw)
