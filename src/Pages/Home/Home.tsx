import React, { memo, useCallback, useRef } from 'react'

import { useParams } from 'react-router-dom'

import { VideoPlayer } from '../../components/VideoPlayer'
import { MediaSourceService, useVideoService } from '../../services'

const bloby = new MediaSourceService()

export const HomeRaw = () => {
  const { init, playVideo, pauseVideo, setSource, toggleMute, getDuration } =
    useVideoService()
  const { screenId } = useParams()
  const useVideoRef = useRef<any>()

  const handleClick = useCallback(() => {
    init(useVideoRef)
    setSource('https://media.w3.org/2010/05/bunny/movie.mp4')
  }, [init, setSource])

  const handlePlayPause = useCallback(() => {
    if (useVideoRef.current.paused) {
      playVideo()
    } else {
      pauseVideo()
    }
  }, [pauseVideo, playVideo])

  return (
    <div>
      <video controls id="myvideo"></video>
      <button onClick={() => bloby.createblob('myvideo')}>create blob</button>
      <button onClick={() => bloby.pushFile()}>add file</button>
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
