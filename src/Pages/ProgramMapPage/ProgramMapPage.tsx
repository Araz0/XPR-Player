import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import {
  Check,
  DeleteOutline,
  DownloadOutlined,
  Edit,
  EditOff,
  Save,
  SaveOutlined,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'

import {
  AdminPageWrapper,
  EditableLabel,
  MainButton,
  MainButtonVariants,
  Popup,
  TreeList,
} from 'components'
import { useProgram, useSupabase } from 'hooks'
import { useAdminStore } from 'stores'
import { saveProgramAsJson } from 'utils'

const StyledActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
`
const StyledActionsWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: fit-content;
`
const StyledTitleContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  h6 {
    margin: 0;
  }
`

export const ProgramMapPageRaw = () => {
  const navigate = useNavigate()
  const { updateProgramTitle } = useProgram()
  const { handleUpdateProgramInDb, deleteProgram } = useSupabase()

  const program = useAdminStore((s) => s.program)

  const titleRef = useRef<HTMLInputElement>()
  const [canEditTitle, setCanEditTitle] = useState<boolean>(false)
  const [showDeleteProgram, setShowDeleteProgram] = useState<boolean>(false)

  const handleDeleteProgram = useCallback(() => {
    if (!program) return
    deleteProgram(program.id)
    navigate(`/admin/programs`)
  }, [deleteProgram, navigate, program])

  const handleSaveProgramAsJson = useCallback(() => {
    if (!program) return
    saveProgramAsJson(program)
  }, [program])

  const handleUpdateTitle = useCallback(() => {
    if (!titleRef.current?.value) return
    updateProgramTitle(titleRef.current?.value)
    setCanEditTitle(!canEditTitle)
  }, [canEditTitle, updateProgramTitle])

  useEffect(() => {
    if (!program) navigate('/admin/programs')
  }, [navigate, program])

  if (!program) return <h1>Something went wrong loading the program</h1>
  return (
    <AdminPageWrapper>
      <StyledActionsContainer>
        <StyledTitleContainer>
          <EditableLabel
            inputRef={titleRef}
            canEdit={canEditTitle}
            text={program.title}
            placeHolder={'Program Title'}
            typographyVariant={'h6'}
          />
          {canEditTitle && (
            <IconButton onClick={handleUpdateTitle} size="small">
              <Save />
            </IconButton>
          )}
          <IconButton
            onClick={() => setCanEditTitle(!canEditTitle)}
            size="small"
          >
            {canEditTitle ? <EditOff /> : <Edit />}
          </IconButton>
        </StyledTitleContainer>

        <StyledActionsWrapper>
          <MainButton
            variant={MainButtonVariants.PRIMARY}
            onClick={handleSaveProgramAsJson}
            width={'fit-contnet'}
            startIcon={<DownloadOutlined fontSize="small" />}
          >
            Download
          </MainButton>
          <MainButton
            variant={MainButtonVariants.PRIMARY}
            onClick={() => handleUpdateProgramInDb(program)}
            width={'fit-contnet'}
            startIcon={<SaveOutlined fontSize="small" />}
          >
            Save
          </MainButton>
          <MainButton
            variant={MainButtonVariants.SECONDARY}
            onClick={() => setShowDeleteProgram(true)}
            width={'fit-contnet'}
            startIcon={<DeleteOutline fontSize="small" />}
          >
            Delete
          </MainButton>
        </StyledActionsWrapper>
      </StyledActionsContainer>

      <TreeList />

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
