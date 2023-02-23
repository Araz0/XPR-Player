import { memo, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { TreeList } from '../../components'
import { useSupabase } from '../../hooks'
import { useAdminStore } from '../../stores'

export const ProgramPageRaw = () => {
  const { programId } = useParams()
  const { getProgramById } = useSupabase()
  const setProgram = useAdminStore((s) => s.setProgram)

  useEffect(() => {
    if (!programId) return
    getProgramById(programId).then((res) => {
      setProgram(res)
    })
  }, [getProgramById, programId, setProgram])

  return (
    <>
      <TreeList />
    </>
  )
}
export const ProgramPage = memo(ProgramPageRaw)
