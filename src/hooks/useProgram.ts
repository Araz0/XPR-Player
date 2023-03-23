import { useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import { useAdminStore } from 'stores'
import { ProgramType, ScreenType, SegmentMediaType, SegmentType } from 'types'
import { generateNewId, loadJsonFile } from 'utils'

export function useProgram() {
  const program = useAdminStore((s) => s.program)
  const setProgram = useAdminStore((s) => s.setProgram)
  const navigate = useNavigate()

  const loadJsonProgram = useCallback(
    (jsonPath: string) => {
      loadJsonFile(jsonPath).then((prog) => {
        setProgram(prog as ProgramType)
        navigate(`/admin/programMap`)
      })
    },
    [navigate, setProgram]
  )

  const segmentIsReferenced = useCallback(
    (segmentId: number) => {
      if (!program) return false
      let counter = 0
      for (let i = 0; i < program.segments.length; i++) {
        if (program.segments[i].nextSegmentIds?.includes(segmentId)) {
          counter++
        }
        if (counter > 1) return true
      }
      return false
    },
    [program]
  )

  const updateProgramTitle = useCallback(
    (newTitle: string) => {
      if (!program) return
      setProgram({
        ...program,
        title: newTitle,
      })
    },
    [program, setProgram]
  )
  const getSegmentById = useCallback(
    (segmentId: number) => {
      if (!program) return
      return program.segments.find((s) => s.id === segmentId)
    },
    [program]
  )

  const getMediaById = useCallback(
    (mediaId: number) => {
      if (!program) return
      return program.media.find((m) => m.id === mediaId)
    },
    [program]
  )

  const getProgramIntroSegment = useCallback(() => {
    if (!program) return
    const introSegment = program.segments.find((s) => s.isIntro)
    if (!introSegment) {
      const newIntroSegment: SegmentType = {
        id: generateNewId(),
        mediaId: generateNewId(),
        isIntro: true,
      }
      setProgram({
        ...program,
        segments: [...program.segments, newIntroSegment],
      })
      return newIntroSegment
    }
    return introSegment
  }, [program, setProgram])

  const createNewProgram = useCallback(
    (
      title: string,
      discription: string,
      thumbnail: string,
      amountOfScreens: number
    ) => {
      const newProgram = {
        id: generateNewId(),
        title: title,
        amountOfScreens: amountOfScreens,
        discription: discription,
        thumbnail: thumbnail,
        segments: [],
        media: [],
      }
      setProgram(newProgram)
      navigate(`/admin/programMap`)
    },
    [navigate, setProgram]
  )

  const addNextSegmentById = useCallback(
    (parentSegmentId: number, segmentId: number) => {
      if (!program) return
      const parentSegment = getSegmentById(parentSegmentId)
      if (!parentSegment) return

      parentSegment.nextSegmentIds
        ? parentSegment.nextSegmentIds.push(segmentId)
        : (parentSegment.nextSegmentIds = [segmentId])

      const parentSegmentIndex = program.segments.findIndex(
        (s) => s.id === parentSegmentId
      )

      const updatedSegments = [...program.segments]
      updatedSegments[parentSegmentIndex] = parentSegment

      setProgram({
        ...program,
        segments: [...updatedSegments],
      })
    },
    [getSegmentById, program, setProgram]
  )

  const addNewSegment = useCallback(
    (parentSegment: SegmentType, mediaId: number) => {
      if (!program) return
      const newSegment = {
        id: generateNewId(),
        mediaId: mediaId,
      }
      parentSegment.nextSegmentIds
        ? parentSegment.nextSegmentIds.push(newSegment.id)
        : (parentSegment.nextSegmentIds = [newSegment.id])

      const parentSegmentIndex = program.segments.findIndex(
        (s) => s.id === parentSegment.id
      )
      const updatedSegments = [...program.segments]
      updatedSegments[parentSegmentIndex] = parentSegment

      setProgram({
        ...program,
        segments: [...updatedSegments, newSegment],
      })
    },
    [program, setProgram]
  )
  const addScreenToMedia = useCallback(
    (mediaId: number, screen: ScreenType) => {
      const media = getMediaById(mediaId)
      if (!media) return
      media.screens.push(screen)

      if (!program) return
      const mediaIndex = program.media.findIndex((m) => m.id === media.id)
      program.media[mediaIndex] = media
      setProgram(program)
    },
    [getMediaById, program, setProgram]
  )
  const updateSegment = useCallback(
    (segment: SegmentType) => {
      if (!program) return
      const segmentIndex = program.segments.findIndex(
        (s) => s.id === segment.id
      )
      const updatedSegments = [...program.segments]
      updatedSegments[segmentIndex] = segment

      setProgram({
        ...program,
        segments: [...updatedSegments],
      })
    },
    [program, setProgram]
  )

  const setMediaIdInSegment = useCallback(
    (segment: SegmentType, mediaId: number) => {
      if (!program) return
      const segmentIndex = program.segments.findIndex(
        (s) => s.id === segment.id
      )
      segment.mediaId = mediaId
      const updatedSegments = [...program.segments]
      updatedSegments[segmentIndex] = segment

      setProgram({
        ...program,
        segments: [...updatedSegments],
      })
    },
    [program, setProgram]
  )

  const updateMedia = useCallback(
    (media: SegmentMediaType) => {
      if (!program) return
      const mediaIndex = program.media.findIndex((m) => m.id === media.id)

      const updatedMedia = [...program.media]
      updatedMedia[mediaIndex] = media

      setProgram({
        ...program,
        media: [...updatedMedia],
      })
    },
    [program, setProgram]
  )

  const addMediaToProgram = useCallback(
    (media: SegmentMediaType) => {
      if (!program) return
      program.media.push(media)
      setProgram({
        ...program,
        media: program.media,
      })
    },
    [program, setProgram]
  )

  // custom hook to get segment and remove it from the segments array of program
  const removeSegment = useCallback(
    (segmentId: number) => {
      if (!program) return
      const updatedSegments = program.segments.map((segment) => {
        if (
          segment.id !== segmentId &&
          segment.nextSegmentIds &&
          segment.nextSegmentIds.includes(segmentId)
        ) {
          return {
            ...segment,
            nextSegmentIds: segment.nextSegmentIds.filter(
              (id) => id !== segmentId
            ),
          }
        }
        return segment
      })

      setProgram({
        ...program,
        segments: [...updatedSegments],
      })
    },
    [program, setProgram]
  )

  const removeMediaScreen = useCallback(
    (media: SegmentMediaType, mediaId: number) => {
      if (!program) return
      const mediaIndex = program.media.findIndex((m) => m.id === media.id)
      media.screens = media.screens.filter((s) => s.id !== mediaId)
      program.media[mediaIndex] = media
      setProgram(program)
    },
    [program, setProgram]
  )

  return {
    getSegmentById,
    addNewSegment,
    getProgramIntroSegment,
    addMediaToProgram,
    addScreenToMedia,
    updateSegment,
    setMediaIdInSegment,
    updateMedia,
    removeSegment,
    removeMediaScreen,
    updateProgramTitle,
    loadJsonProgram,
    addNextSegmentById,
    getMediaById,
    createNewProgram,
    segmentIsReferenced,
  }
}
