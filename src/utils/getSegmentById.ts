import { ProgramType, SegmentType } from '../types'

export function getSegmentById(
  program: ProgramType,
  segmentId: string
): SegmentType | undefined {
  return program.segments.find((s) => s.id === segmentId)
}
