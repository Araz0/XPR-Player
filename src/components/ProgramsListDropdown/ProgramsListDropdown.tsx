import { memo, useCallback, useState } from 'react'

import { Check } from '@mui/icons-material'
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
} from '@mui/material'

import { useAdminStore } from 'stores'
import { DbProgram } from 'types'

export type ProgramsListDropdownProps = {
  programs: DbProgram[]
}
export const ProgramsListDropdownRaw = ({
  programs,
}: ProgramsListDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)
  const selectedProgram = useAdminStore((s) => s.selectedProgram)

  const menuOpen = Boolean(anchorEl)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    },
    []
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleOnProgramClick = useCallback(
    (dbProgram: DbProgram) => {
      setSelectedProgram(dbProgram.program)
      handleClose()
    },
    [handleClose, setSelectedProgram]
  )

  return (
    <>
      <Button
        onClick={handleClick}
        id="basic-button"
        aria-controls={menuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        size="small"
      >
        <TextField
          id="outlined-read-only-input"
          label="Program"
          defaultValue={'select a program'}
          value={selectedProgram?.title}
          InputProps={{
            readOnly: true,
          }}
          size="small"
          style={{ margin: '5px' }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {programs.map((program) => {
          return (
            <MenuItem onClick={() => handleOnProgramClick(program)}>
              {selectedProgram?.id === program.program.id && (
                <ListItemIcon>
                  <Check fontSize="small" />
                </ListItemIcon>
              )}

              <ListItemText>{program.program.title}</ListItemText>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export const ProgramsListDropdown = memo(ProgramsListDropdownRaw)
