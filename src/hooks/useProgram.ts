import { useCallback } from 'react'

import { useAdminStore } from '../stores'
import { SegmentType } from '../types'

export const useProgram = () => {
  const program = useAdminStore((s) => s.program)
  const setProgram = useAdminStore((s) => s.setProgram)

  const getSegmentById = useCallback(
    (segmentId: string) => {
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
    (parentSegmentId: string, newSegmentTitle: string) => {
      const parentSegment = getSegmentById(parentSegmentId)
      if (!parentSegment) return
      const newSegment = {
        id: new Date().getTime().toString(),
        title: newSegmentTitle,
        screens: [],
      }
      parentSegment.nextSegmentIds
        ? parentSegment.nextSegmentIds.push(newSegment.id)
        : (parentSegment.nextSegmentIds = [newSegment.id])

      addSegment(parentSegment)
      addSegment(newSegment)
    },
    [addSegment, getSegmentById]
  )

  return { getSegmentById, addNextSegment, addSegment }
}
