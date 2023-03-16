import { ProgramType } from 'types'

export function saveProgramAsJson(program: ProgramType) {
  const json = JSON.stringify(program, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${program.title}-${program.id}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
