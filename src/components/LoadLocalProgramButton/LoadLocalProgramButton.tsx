import { memo, useCallback } from 'react'

import { FileOpen } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

import { useProgram } from '../../hooks'

export const LoadLocalProgramButtonRaw = () => {
  const { loadJsonProgram } = useProgram()

  const handleImportJsonProgram = useCallback(
    (e: any) => {
      loadJsonProgram('/' + e.target.files[0].name)
    },
    [loadJsonProgram]
  )
  return (
    <Tooltip title="Load program as JSON">
      <IconButton component="label">
        <input
          hidden
          accept="application/json"
          type="file"
          onChange={handleImportJsonProgram}
        />
        <FileOpen />
      </IconButton>
    </Tooltip>
  )
}

export const LoadLocalProgramButton = memo(LoadLocalProgramButtonRaw)
