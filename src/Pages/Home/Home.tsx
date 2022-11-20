import React, { memo, useCallback, useRef, useState } from 'react'

import { useParams } from 'react-router-dom'

import { VideoPlayer } from '../../components/VideoPlayer'

const video1 = '/media/102.mp4'
const video2 = '/media/103.mp4'

// const url1 = 'https://media.w3.org/2010/05/bunny/movie.mp4'
// const url2 = 'https://media.w3.org/2010/05/sintel/trailer.mp4'
export const HomeRaw = () => {
  const { screenId } = useParams()
  const useVideoRef = useRef<any>()
  const useVideoRef2 = useRef<any>()
  const [flag, setFlag] = useState(true)

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
    if (flag) {
      useVideoRef.current.src = video2
      useVideoRef2.current.src = video2
      setFlag(false)
    } else {
      useVideoRef.current.src = video1
      useVideoRef2.current.src = video1
      setFlag(true)
    }
    useVideoRef.current.play()
    useVideoRef2.current.play()
  }, [flag])
  return (
    <div>
      <header>
        <p>
          Edit <code>src/App.tsx/{screenId}</code> and save to reload.
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

export const Home = memo(HomeRaw)
