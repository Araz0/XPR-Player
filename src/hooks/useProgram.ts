import { useCallback } from 'react'

import { useAdminStore } from '../stores'
import { ScreenType, SegmentType } from '../types'
import { generateNewId } from '../utils'

export const useProgram = () => {
  const program = useAdminStore((s) => s.program)
  const setProgram = useAdminStore((s) => s.setProgram)

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
  const addSegment = useCallback(
    (newSegment: SegmentType) => {
      if (!program) return
      setProgram({
        ...program,
        segments: [...program.segments, newSegment],
      })
    },
    [program, setProgram]
  )
  const addNextSegment = useCallback(
    (
      parentSegmentId: number,
      segmentTitle: string,
      segmentDescription: string
    ) => {
      if (!program) return
      const parentSegment = getSegmentById(parentSegmentId)
      if (!parentSegment) return
      const newSegment = {
        id: generateNewId(),
        title: segmentTitle,
        description: segmentDescription,
        screens: [],
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
    [getSegmentById, program, setProgram]
  )
  const addScreenToSegment = useCallback(
    (segmentId: number, screen: ScreenType) => {
      const segment = getSegmentById(segmentId)
      if (!segment) return
      segment.screens.push(screen)
    },
    [getSegmentById]
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

  const removeSegmentScreen = useCallback(
    (segment: SegmentType, screenId: number) => {
      if (!program) return
      const segmentIndex = program.segments.findIndex(
        (s) => s.id === segment.id
      )
      segment.screens = segment.screens.filter((s) => s.id !== screenId)
      program.segments[segmentIndex] = segment
      setProgram(program)
    },
    [program, setProgram]
  )

  return {
    getSegmentById,
    addNextSegment,
    addSegment,
    addScreenToSegment,
    updateSegment,
    removeSegment,
    removeSegmentScreen,
    updateProgramTitle,
  }
}
