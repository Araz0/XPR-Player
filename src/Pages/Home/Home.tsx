import React, { memo, useCallback, useRef } from 'react'

import { useParams } from 'react-router-dom'

import { VideoPlayer } from '../../components/VideoPlayer'
import { useScreenPlayer } from '../../hooks'

export const HomeRaw = () => {
  const { init, setSource, playScreen, pauseScreen, toggleMute, getDuration } =
    useScreenPlayer()
  const { screenId } = useParams()
  const useVideoRef = useRef<any>()

  const handleClick = useCallback(() => {
    init(useVideoRef)
    setSource('https://media.w3.org/2010/05/bunny/movie.mp4')
  }, [init, setSource])

  const handlePlayPause = useCallback(() => {
    if (useVideoRef.current.paused) {
      playScreen()
    } else {
      pauseScreen()
    }
  }, [pauseScreen, playScreen])

  return (
    <div>
      <header>
        <p>
          Edit <code>src/App.tsx/{screenId}</code> and save to reload.
        </p>
        <button onClick={handleClick}>init</button>
        <button onClick={handlePlayPause}>PlayPause</button>
        <button onClick={toggleMute}>toggleMute</button>
        <button onClick={getDuration}>getDuration</button>
        <VideoPlayer ref={useVideoRef} />
      </header>
    </div>
  )
}

export const Home = memo(HomeRaw)
