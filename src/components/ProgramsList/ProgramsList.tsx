import { memo, useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Check } from '@mui/icons-material'
import { IconButton, List, styled } from '@mui/material'
import { ProgramsItem } from 'components/ProgramsItem'
import { downloadJson } from 'utils/downloadJson'

import { useSupabase } from 'hooks'
import { useAdminStore } from 'stores'
import { DbProgram, ProgramType } from 'types'
import { generateNewId } from 'utils'

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
  const { deleteProgram, insertProgram } = useSupabase()
  const setSelectedProgram = useAdminStore((s) => s.setSelectedProgram)
  const setProgram = useAdminStore((s) => s.setProgram)
  const [deleteProgramId, setDeleteProgramId] = useState<number | undefined>(
    undefined
  )

  const handleDeleteProgram = useCallback(() => {
    if (!deleteProgramId) return
    deleteProgram(deleteProgramId)
    setDeleteProgramId(undefined)
  }, [deleteProgram, deleteProgramId])

  const handleSetAsSelectedProgram = useCallback(
    (program: ProgramType) => {
      setSelectedProgram(program)
      navigate('/admin')
    },
    [setSelectedProgram, navigate]
  )

  // duplicate a program and add it to programs
  const duplicateProgram = useCallback(
    (program: ProgramType) => {
      const newProgram = {
        ...program,
        id: generateNewId(),
        title: program.title + ' (copy)',
      }
      insertProgram(newProgram)
    },
    [insertProgram]
  )

  const handleOpenProgram = useCallback(
    (program: ProgramType) => {
      setProgram(program)
      navigate('/admin/programMap')
    },
    [navigate, setProgram]
  )

  const handleSaveProgramAsJson = useCallback((program: ProgramType) => {
    downloadJson(program, `${program.title}-${program.id}`)
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
      {programs.map((program: DbProgram, key: number) => {
        return (
          <ProgramsItem
            key={key}
            title={program.program.title}
            description={program.program.discription}
            tags={[
              `${program.program.screensInfo.length} screens`,
              program.user_id === 'anonymous' ? 'local' : '',
              program.program.meta?.estimatedTime
                ? program.program.meta?.estimatedTime
                : '',
            ]}
            thumbnail={program.program.thumbnail}
            onClick={() => handleSetAsSelectedProgram(program.program)}
            onEdit={() => handleOpenProgram(program.program)}
            onCopy={() => duplicateProgram(program.program)}
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
