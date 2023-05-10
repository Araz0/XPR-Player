import { memo, useCallback, useRef, useState } from 'react'

import styled from 'styled-components'

import { Add, AddCircle, AddToQueue, Delete, Loop } from '@mui/icons-material'
import { Divider, TextField, ThemeProvider } from '@mui/material'
import { MainButton, MainButtonVariants } from 'components/MainButton'
import { PRIMARY_COLOR, lightTheme } from 'constants/styles'

import { useProgram, useSupabase } from 'hooks'
import { ProgramScreensInfo } from 'types'

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
  margin: 0;
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
  height: 78px;

  justify-items: center;
  display: grid;
  align-content: center;

  cursor: pointer;
  position: relative;

  svg {
    color: ${PRIMARY_COLOR};
    z-index: 10;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
  }
`
const StyledLoopIcon = styled(Loop)`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  animation-name: rotate;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`
const StyledScreenInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const StyledThumbnailDescriptionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  textarea {
    font-size: 14px;
  }
`

export const CreateProgramFormRaw = () => {
  const { handleUploadProgramThubmnail } = useSupabase()
  const titleRef = useRef<any>()
  const descriptionRef = useRef<any>()
  const thumbnailRef = useRef<HTMLInputElement | null>(null)

  const [thumbnailImg, setThumbnailImg] = useState<string>(
    '/media/thumbnailFallback.jpg'
  )
  const [uploadingThumbnail, setUploadingThumbnail] = useState<boolean>(false)

  const { createNewProgram } = useProgram()
  const [screens, setScreens] = useState<ProgramScreensInfo[]>([
    { title: 'Main' },
  ])

  const handleuploadThumbnail = useCallback(
    async (e: any) => {
      setUploadingThumbnail(true)
      let data
      try {
        data = await handleUploadProgramThubmnail(e)
      } catch (error) {
        data = '/media/thumbnailFallback.jpg'
      }
      setUploadingThumbnail(false)
      if (data) setThumbnailImg(data)
    },
    [handleUploadProgramThubmnail]
  )

  const onScreenTitleChange = useCallback(
    (e: any, index: number) => {
      if (!screens) return
      const newTitle = e?.target.value

      screens[index].title = newTitle
      setScreens([...screens])
    },
    [screens]
  )
  const handleCreateScreenInfo = useCallback(() => {
    setScreens((prev) => {
      return [...prev, { title: `Screen ${prev.length + 1}` }]
    })
  }, [])

  const handleRemoveScreenInfo = useCallback((index: number) => {
    setScreens((prev) => {
      return prev.filter((_, idx) => idx !== index)
    })
  }, [])

  const handleCreateProgram = useCallback(() => {
    if (!titleRef.current) return
    if (!descriptionRef.current) return
    createNewProgram(
      titleRef.current.value,
      descriptionRef.current.value,
      thumbnailImg,
      screens || [{ title: 'Front' }, { title: 'Left' }, { title: 'Back' }]
    )
  }, [createNewProgram, thumbnailImg, screens])

  const handleOnThumbnailClick = useCallback(() => {
    thumbnailRef.current?.click()
  }, [])

  return (
    <StyledFormContainer>
      <StyledInputLabel>Title of program</StyledInputLabel>
      <StyledTextInput
        ref={titleRef}
        type="text"
        id="programTitle"
        name="programTitle"
        placeholder="Untitled Program"
      />
      <StyledThumbnailDescriptionWrapper>
        <div>
          <StyledInputLabel>Thumbnail</StyledInputLabel>
          <StyledThumbnailInputContainer onClick={handleOnThumbnailClick}>
            {uploadingThumbnail ? <StyledLoopIcon /> : <AddCircle />}
            {thumbnailImg && <img src={thumbnailImg} alt="Thumbnail Preview" />}
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleuploadThumbnail}
              ref={thumbnailRef}
              style={{ display: 'none' }}
            />
          </StyledThumbnailInputContainer>
        </div>
        <div>
          <StyledInputLabel>Description</StyledInputLabel>
          <ThemeProvider theme={lightTheme}>
            <TextField
              fullWidth={true}
              ref={descriptionRef}
              style={{
                border: `2px solid ${PRIMARY_COLOR}`,
                borderRadius: '8px',
              }}
              multiline
              rows={2}
              variant="outlined"
              id="programDescription"
              name="programDescription"
              placeholder="Write something short..."
            />
          </ThemeProvider>
        </div>
      </StyledThumbnailDescriptionWrapper>

      <StyledInputLabel>Screens</StyledInputLabel>
      {screens?.map((screen, idx) => {
        return (
          <StyledScreenInfoContainer key={idx}>
            <StyledTextInput
              type="text"
              id={`ProgramScreen${idx}`}
              name={`ProgramScreen${idx}`}
              placeholder="#1 Screen: Front"
              onChange={(e) => onScreenTitleChange(e, idx)}
              value={screen.title}
            />
            <MainButton
              onClick={() => handleRemoveScreenInfo(idx)}
              width={'fit-content'}
              startIcon={<Delete />}
              variant={MainButtonVariants.SECONDARY}
            >
              Remove
            </MainButton>
          </StyledScreenInfoContainer>
        )
      })}

      <MainButton
        onClick={handleCreateScreenInfo}
        width={'fit-content'}
        startIcon={<AddToQueue />}
        variant={MainButtonVariants.PRIMARY}
      >
        Add Screen
      </MainButton>
      <br />
      <Divider />
      <br />
      <MainButton
        onClick={handleCreateProgram}
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
