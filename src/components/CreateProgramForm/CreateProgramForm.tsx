import { memo } from 'react'

import styled from 'styled-components'

import { Add } from '@mui/icons-material'
import { Slider } from '@mui/material'
import { MainButton, MainButtonVariants } from 'components/MainButton'
import { PRIMARY_COLOR } from 'constants/styles'

const StyledInputLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
`
const StyledTextInput = styled.input`
  margin-bottom: 15px;
  border-radius: 5px;
  height: 35px;
  width: 100%;
  border: 2px solid ${PRIMARY_COLOR};
  padding: 0 10px;
`

const StyledFormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledThumbnailInputContainer = styled.div`
  border: 2px solid ${PRIMARY_COLOR};
  border-radius: 5px;
  width: 145px;
  height: 72px;
`

const StyledSliderContainer = styled.div`
  max-width: 200px;
  padding: 15px;
`

export const CreateProgramFormRaw = () => {
  return (
    <StyledFormContainer>
      <StyledInputLabel>Title of program</StyledInputLabel>
      <StyledTextInput
        type="text"
        id="programTitle"
        name="programTitle"
        placeholder="Untitled Program"
      />
      <StyledInputLabel>Thumbnail</StyledInputLabel>
      <StyledThumbnailInputContainer></StyledThumbnailInputContainer>
      <StyledInputLabel>Description</StyledInputLabel>
      <StyledTextInput
        type="text"
        id="programTitle"
        name="programTitle"
        placeholder="Description"
      />

      <StyledSliderContainer>
        <Slider
          value={5}
          onChange={() => alert('')}
          aria-label="amount of screens"
          defaultValue={1}
          valueLabelDisplay="auto"
          marks
          min={1}
          max={5}
          step={1}
        />
      </StyledSliderContainer>

      <MainButton
        onClick={() => alert('program')}
        width={'fit-contnet'}
        startIcon={<Add />}
        variant={MainButtonVariants.PRIMARY}
      >
        Create Program
      </MainButton>
    </StyledFormContainer>
  )
}

export const CreateProgramForm = memo(CreateProgramFormRaw)
