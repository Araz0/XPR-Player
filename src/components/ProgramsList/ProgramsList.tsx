import { memo, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import { Delete, AccountTree } from '@mui/icons-material'
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  Tooltip,
} from '@mui/material'

import { program } from '../../fakeProgram'
import { useSupabase } from '../../hooks'
import { useAdminStore } from '../../stores'
import { DbProgram } from '../../types'

const StyledProgramsListContainer = styled(List)`
  max-width: 400px;
  margin: 0 auto;
  border: 1px dashed rgba(255, 255, 255, 0.5);
  border-radius: 5px;
`

export type ProgramsListProps = {
  programs: DbProgram[]
}

export const ProgramsListRaw = ({ programs }: ProgramsListProps) => {
  const navigate = useNavigate()
  const { deleteProgram } = useSupabase()
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)
  const setProgram = useAdminStore((s) => s.setProgram)

  const handleDeleteProgram = useCallback(() => {
    if (!program) return
    deleteProgram(program.id)
    navigate('/admin/programs')
  }, [deleteProgram, navigate])

  const handleSetAsSelectedProgram = useCallback(() => {
    if (!program) return
    setSelectedProgram(program)
    navigate('/admin')
  }, [setSelectedProgram, navigate])

  const handleOpenProgram = useCallback(
    (dbProgram: DbProgram) => {
      setProgram(dbProgram.program)
      navigate('/admin/programMap')
    },
    [navigate, setProgram]
  )
  console.log(
    '🚀 ~ file: ProgramsList.tsx:107 ~ ProgramsListRaw ~ programs:',
    programs,
    programs.length
  )

  if (programs.length === 0)
    return (
      <h3>
        You dont have any programs saved online, import a local json save or
        create a new one.
      </h3>
    )
  return (
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
                <>
                  <Tooltip title="Open Program Map">
                    <IconButton
                      edge="end"
                      onClick={() => handleOpenProgram(program)}
                    >
                      <AccountTree />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Program">
                    <IconButton edge="end" onClick={handleDeleteProgram}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleSetAsSelectedProgram}
                dense
              >
                <ListItemText primary={program.program.title} />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        )
      })}
    </StyledProgramsListContainer>
  )
}

export const ProgramsList = memo(ProgramsListRaw)
