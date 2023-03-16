import { ProgramType } from 'types'

export function addNextSegmentId(
  program: ProgramType,
  segmentId: number,
  nextSegmentId: number
): void {
  const segment = program.segments.find((s) => s.id === segmentId)
  if (segment) {
    if (!segment.nextSegmentIds) {
      segment.nextSegmentIds = []
    }
    segment.nextSegmentIds.push(nextSegmentId)
  }
}
