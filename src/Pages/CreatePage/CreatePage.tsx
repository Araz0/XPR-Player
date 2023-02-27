import { memo, useCallback, useRef, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { NoteAdd } from '@mui/icons-material'
import { Typography, Divider, TextField, Slider, Button } from '@mui/material'

import { AdminPageWrapper } from '../../components'
import { useSupabase } from '../../hooks'
import { useAdminStore } from '../../stores'
import { generateNewId } from '../../utils'

const StyledActionsContainer = styled.div`
  max-width: 720px;
  margin-inline: auto;
  margin-top: 100px;
`
const StyledSliderContainer = styled.div`
  max-width: 200px;
  padding: 15px;
`
export const CreatePageRaw = () => {
  const navigate = useNavigate()
  const titleRef = useRef<HTMLInputElement>()
  const { insertProgram } = useSupabase()
  const [screensAmount, setScreensAmount] = useState<number>(1)
  const setProgram = useAdminStore((s) => s.setProgram)

  const handleChangeScreensAmount = (
    event: Event,
    newValue: number | number[]
  ) => {
    setScreensAmount(newValue as number)
  }

  const handleCreateProgram = useCallback(() => {
    const newProgram = {
      id: generateNewId(),
      title: titleRef.current?.value || 'New Program',
      amountOfScreens: screensAmount,
      segments: [],
    }
    setProgram(newProgram)
    insertProgram(newProgram)
    navigate(`/admin/programs/${newProgram.id}`)
  }, [insertProgram, setProgram, navigate, screensAmount])

  return (
    <AdminPageWrapper>
      <StyledActionsContainer>
        <Typography variant="h6">Create new Program</Typography>
        <Divider />
        <Typography variant="subtitle1">
          Please fill the input field and submit to continue creating the
          program.
        </Typography>
        <br />
        <TextField
          inputRef={titleRef}
          placeholder={'Program title'}
          size="small"
        />
        <br />
        <Typography variant="subtitle1">
          How many screens you plan to use?
        </Typography>
        <StyledSliderContainer>
          <Slider
            value={screensAmount}
            onChange={handleChangeScreensAmount}
            aria-label="amount of screens"
            defaultValue={1}
            valueLabelDisplay="auto"
            marks
            min={1}
            max={5}
            step={1}
          />
        </StyledSliderContainer>
        <Button
          variant="contained"
          onClick={handleCreateProgram}
          endIcon={<NoteAdd />}
        >
          Create Program
        </Button>
      </StyledActionsContainer>
    </AdminPageWrapper>
  )
}
export const CreatePage = memo(CreatePageRaw)
