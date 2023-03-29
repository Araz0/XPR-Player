import { memo, useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Check } from '@mui/icons-material'
import { IconButton, List, styled } from '@mui/material'
import { ProgramsItem } from 'components/ProgramsItem'

import { useSupabase } from 'hooks'
import { useAdminStore } from 'stores'
import { DbProgram, ProgramType } from 'types'
import { saveProgramAsJson } from 'utils'

import { Popup } from '../Popup'

const StyledProgramsListContainer = styled(List)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  align-items: center;
`

export type ProgramsListProps = {
  programs: DbProgram[]
}

export const ProgramsListRaw = ({ programs }: ProgramsListProps) => {
  const navigate = useNavigate()
  const { deleteProgram } = useSupabase()
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)
  const setProgram = useAdminStore((s) => s.setProgram)
  const [deleteProgramId, setDeleteProgramId] = useState<number | undefined>(
    undefined
  )

  const handleDeleteProgram = useCallback(() => {
    if (!deleteProgramId) return
    deleteProgram(deleteProgramId)
    navigate('/admin/programs')
  }, [deleteProgram, deleteProgramId, navigate])

  const handleSetAsSelectedProgram = useCallback(
    (program: ProgramType) => {
      setSelectedProgram(program)
      navigate('/admin')
    },
    [setSelectedProgram, navigate]
  )

  const handleOpenProgram = useCallback(
    (dbProgram: DbProgram) => {
      setProgram(dbProgram.program)
      navigate('/admin/programMap')
    },
    [navigate, setProgram]
  )

  const handleSaveProgramAsJson = useCallback((program: ProgramType) => {
    saveProgramAsJson(program)
  }, [])

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
          <ProgramsItem
            key={program.id}
            title={program.program.title}
            description={program.program.discription}
            tags={[
              `${program.program.screensInfo.length} screens`,
              '7-12 Minutes',
            ]}
            thumbnail={program.program.thumbnail}
            onClick={() => handleSetAsSelectedProgram(program.program)}
            onEdit={() => handleOpenProgram(program)}
            onCopy={() => alert('onCopy')}
            onDownload={() => handleSaveProgramAsJson(program.program)}
            onDelete={() => setDeleteProgramId(program.program.id)}
          />
        )
      })}
      {deleteProgramId && (
        <Popup
          onClose={() => setDeleteProgramId(undefined)}
          header="Delete Segment"
          bodyText="Are you sure you want to delete this Program?"
        >
          <IconButton onClick={handleDeleteProgram}>
            <Check />
          </IconButton>
        </Popup>
      )}
    </StyledProgramsListContainer>
  )
}

export const ProgramsList = memo(ProgramsListRaw)
