import React, { useCallback, useRef } from 'react'

import { VideoPlayer } from './components'

function App() {
  const useVideoRef = useRef<any>()
  const useVideoRef2 = useRef<any>()

  const handleClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('useVideoRef', useVideoRef.current)
    // eslint-disable-next-line no-console
    console.log('useVideoRef2', useVideoRef2.current)
  }, [])
  const handlePlayPause = useCallback(() => {
    if (useVideoRef.current.paused) {
      useVideoRef.current.play()
      useVideoRef2.current.play()
    } else {
      useVideoRef.current.pause()
      useVideoRef2.current.pause()
    }
  }, [])
  const handleSwitchSource = useCallback(() => {
    if (
      useVideoRef.current.src === 'https://media.w3.org/2010/05/bunny/movie.mp4'
    ) {
      useVideoRef.current.src = 'http://media.w3.org/2010/05/sintel/trailer.mp4'
      useVideoRef2.current.src =
        'http://media.w3.org/2010/05/sintel/trailer.mp4'
    } else {
      useVideoRef.current.src = 'https://media.w3.org/2010/05/bunny/movie.mp4'
      useVideoRef2.current.src = 'https://media.w3.org/2010/05/bunny/movie.mp4'
    }
    useVideoRef.current.play()
    useVideoRef2.current.play()
  }, [])
  return (
    <div>
      <header>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={handleClick}>click</button>
        <button onClick={handlePlayPause}>PlayPause</button>
        <button onClick={handleSwitchSource}>SwitchSource</button>

        <VideoPlayer ref={useVideoRef} />
        <VideoPlayer ref={useVideoRef2} />
      </header>
    </div>
  )
}

export default App
