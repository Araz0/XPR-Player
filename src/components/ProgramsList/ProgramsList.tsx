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
  navigateToPath: string
}

export const ProgramsListRaw = ({
  programs,
  navigateToPath,
}: ProgramsListProps) => {
  const navigate = useNavigate()
  const { deleteProgram } = useSupabase()
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)

  const handleDeleteProgram = useCallback(() => {
    if (!program) return
    deleteProgram(program.id)
    navigate(navigateToPath)
  }, [deleteProgram, navigate, navigateToPath])

  const handleSetAsSelectedProgram = useCallback(() => {
    if (!program) return
    setSelectedProgram(program)
    navigate('/admin')
  }, [setSelectedProgram, navigate])

  const handleOpenProgram = useCallback(
    (program: DbProgram) => {
      navigate(`/admin/programs/${program.internal_id}`)
    },
    [navigate]
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
