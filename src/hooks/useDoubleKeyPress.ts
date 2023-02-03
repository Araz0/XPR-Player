import { useCallback, useEffect, useState } from 'react'

export const useDoubleKeyPress = (
  key: string,
  exicute: () => void,
  interval = 500
) => {
  const [keyPressCount, setKeyPressCount] = useState(0)
  let timeoutId: any

  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.key === key) {
        setKeyPressCount(keyPressCount + 1)
      }
    },
    [key, keyPressCount]
  )

  useEffect(() => {
    if (keyPressCount === 2) {
      exicute()
      setKeyPressCount(0)
    } else if (keyPressCount === 1) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutId = setTimeout(() => setKeyPressCount(0), interval)
    }
    return () => clearTimeout(timeoutId)
  }, [keyPressCount])

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress)
    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [handleKeyPress])
}
