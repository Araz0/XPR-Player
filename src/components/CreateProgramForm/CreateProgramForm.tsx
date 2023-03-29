import { memo, useCallback, useRef, useState } from 'react'

import styled from 'styled-components'

import { Add, AddToQueue, Delete } from '@mui/icons-material'
import { Divider } from '@mui/material'
import { MainButton, MainButtonVariants } from 'components/MainButton'
import { PRIMARY_COLOR } from 'constants/styles'

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
  height: 72px;

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
const StyledScreenInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const StyledThumbnailDescriptionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  input[type='text'] {
    height: 72px;
  }
`

export const CreateProgramFormRaw = () => {
  const { handleUploadProgramThubmnail } = useSupabase()
  const titleRef = useRef<any>()
  const descriptionRef = useRef<any>()
  const thumbnailRef = useRef<HTMLInputElement | null>(null)

  const [imageUrl, setImageUrl] = useState<any>(null)

  const { createNewProgram } = useProgram()
  const [screens, setScreens] = useState<ProgramScreensInfo[]>([
    { title: 'Main' },
  ])

  const handleuploadThumbnail = useCallback(
    (e: any) => {
      const file = e.target.files[0]
      const mgUrl = URL.createObjectURL(file)
      setImageUrl(mgUrl)
      handleUploadProgramThubmnail(e)
      console.log(
        '🚀 ~ file: CreateProgramForm.tsx:91 ~ CreateProgramFormRaw ~ mgUrl:',
        imageUrl
      )
    },
    [handleUploadProgramThubmnail, imageUrl]
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
    if (!titleRef.current?.value) return
    if (!descriptionRef.current?.value) return
    createNewProgram(
      titleRef.current.value,
      descriptionRef.current.value,
      '/media/thumbnailFallback.jpg',
      [{ title: 'Front' }, { title: 'Left' }, { title: 'Back' }]
    )
  }, [createNewProgram])

  const handleOnThumbnailClick = useCallback(() => {
    // thumbnailRef.current?.click()
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
            {/* <AddCircleOutline /> */}
            {/* {imageUrl && (
              <img src={'/media/thumbnailFallback.jpg'} alt="Preview" />
            )} */}
            <img src={'/media/thumbnailFallback.jpg'} alt="Preview" />
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
          <StyledTextInput
            ref={descriptionRef}
            type="text"
            id="programDescription"
            name="programDescription"
            placeholder="Description"
          />
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
        width={'fit-contnet'}
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
        width={'fit-content'}
        startIcon={<Add />}
        variant={MainButtonVariants.PRIMARY}
      >
        Create Program
      </MainButton>
    </StyledFormContainer>
  )
}

export const CreateProgramForm = memo(CreateProgramFormRaw)
