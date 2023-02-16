import { SegmentType } from '../types'

export function getIntroSegment(objects: SegmentType[]) {
  return objects.find((obj) => obj.isIntro)
}
