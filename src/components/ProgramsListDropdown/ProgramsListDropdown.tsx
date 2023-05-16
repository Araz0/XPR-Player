import { memo, useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { Check, Edit, KeyboardArrowDown } from '@mui/icons-material'
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
} from '@mui/material'
import { MainButton, MainButtonVariants } from 'components/MainButton'

import { useAdminStore } from 'stores'
import { DbProgram, ProgramType } from 'types'

const StyledButton = styled(Button)`
  position: relative;
  width: fit-content;
  input {
    padding-right: 35px;
    cursor: pointer;
  }
`
const StyledKeyboardArrowDown = styled(KeyboardArrowDown)`
  position: absolute;
  right: 15px;
  color: white;
`

export type ProgramsListDropdownProps = {
  programs: DbProgram[]
}
export const ProgramsListDropdownRaw = ({
  programs,
}: ProgramsListDropdownProps) => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)
  const selectedProgram = useAdminStore((s) => s.selectedProgram)
  const setProgram = useAdminStore((s) => s.setProgram)

  const handleEditProgram = useCallback(
    (program: ProgramType) => {
      setProgram(program)
      navigate('/admin/programMap')
    },
    [navigate, setProgram]
  )

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
      <StyledButton
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
          defaultValue={
            selectedProgram ? selectedProgram?.title : 'select a program'
          }
          InputProps={{
            readOnly: true,
          }}
          size="small"
          style={{ margin: '5px' }}
        />
        <StyledKeyboardArrowDown />
      </StyledButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {programs.map((program, index) => {
          return (
            <MenuItem onClick={() => handleOnProgramClick(program)} key={index}>
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
      {selectedProgram && (
        <MainButton
          variant={MainButtonVariants.PRIMARY}
          onClick={() => handleEditProgram(selectedProgram)}
          width={'fit-content'}
          startIcon={<Edit />}
        >
          Edit
        </MainButton>
      )}
    </>
  )
}

export const ProgramsListDropdown = memo(ProgramsListDropdownRaw)
