import { ProgramType } from '../types'

export function addNextSegmentId(
  program: ProgramType,
  segmentId: string,
  nextSegmentId: string
): void {
  const segment = program.segments.find((s) => s.id === segmentId)
  if (segment) {
    if (!segment.nextSegmentIds) {
      segment.nextSegmentIds = []
    }
    segment.nextSegmentIds.push(nextSegmentId)
  }
}
