import { useCallback } from 'react'

import { useAdminStore } from '../stores'
import { SegmentType } from '../types'
import { getSegmentById } from '../utils'

export const useProgram = () => {
  const program = useAdminStore((s) => s.program)
  const setProgram = useAdminStore((s) => s.setProgram)

  const getSegmentByID = useCallback(
    (segmentId: string) => {
      if (!program) return
      return getSegmentById(program, segmentId)
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
      if (!program) return
      const parentSegment = getSegmentById(program, parentSegmentId)
      if (!parentSegment) return
      parentSegment.nextSegmentIds?.push(parentSegmentId)
      const newSegment = {
        id: new Date().getTime().toString(),
        title: newSegmentTitle,
        screens: [],
      }
      addSegment(parentSegment)
      addSegment(newSegment)
    },
    [addSegment, program]
  )

  return { getSegmentByID, addNextSegment, addSegment }
}
