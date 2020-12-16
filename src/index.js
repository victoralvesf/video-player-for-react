import React, { useState, useRef, useEffect } from 'react'
import './styles.css'

let mouseIsPressed = false
const defaultWidth = document.querySelector('html').offsetWidth * 0.6 + 'px'

function usePlayerState($videoPlayer) {
  const [playerStatus, setPlayerStatus] = useState({
    playing: false,
    currentPercentage: 0,
    stopped: true
  })

  useEffect(() => {
    playerStatus.playing ? playAndPause('play') : playAndPause('pause')
  }, [$videoPlayer, playerStatus.playing])

  function playAndPause(status) {
    $videoPlayer.current[status]()

    status === 'play' &&
      setPlayerStatus({
        ...playerStatus,
        stopped: false
      })
  }

  function toggleVideoPlay() {
    setPlayerStatus({
      ...playerStatus,
      playing: !playerStatus.playing
    })
  }

  function handleInputMouseDown() {
    mouseIsPressed = true
  }

  function handleInputMouseUp() {
    mouseIsPressed = false

    const duration = $videoPlayer.current.duration

    $videoPlayer.current.currentTime =
      (duration / 100) * playerStatus.currentPercentage
  }

  function handleTimeUpdate() {
    if (!mouseIsPressed) {
      const currentTime = $videoPlayer.current.currentTime
      const duration = $videoPlayer.current.duration

      const percentage = (currentTime / duration) * 100

      setPlayerStatus({
        ...playerStatus,
        currentPercentage: percentage
      })
    }
  }

  function handleChangePercentage(event) {
    const currentPercentageValue = event.target.value

    setPlayerStatus({
      ...playerStatus,
      currentPercentage: currentPercentageValue
    })
  }

  function handleResetVideo() {
    setPlayerStatus({
      ...playerStatus,
      playing: false,
      currentPercentage: 0,
      stopped: true
    })
  }

  function isPlayerStopped() {
    if (playerStatus.stopped && playerStatus.currentPercentage === 0) {
      return 'vpfr_stopped_player'
    } else if (playerStatus.playing) {
      return 'vpfr_hide_controls'
    } else {
      return 'vpfr_paused_player'
    }
  }

  return {
    playerStatus,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangePercentage,
    handleInputMouseDown,
    handleInputMouseUp,
    handleResetVideo,
    isPlayerStopped
  }
}

export const ExampleComponent = ({ width, height, url, type, poster }) => {
  const $videoPlayer = useRef(null)
  const {
    playerStatus,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangePercentage,
    handleInputMouseDown,
    handleInputMouseUp,
    handleResetVideo,
    isPlayerStopped
  } = usePlayerState($videoPlayer)

  return (
    <div className={`vpfr_container ${isPlayerStopped()}`}>
      <div className='vpfr_player_controls'>
        <button onClick={toggleVideoPlay}>
          {playerStatus.playing ? 'Pause' : 'Play'}
        </button>

        <input
          type='range'
          min='0'
          max='100'
          onMouseDown={handleInputMouseDown}
          onChange={handleChangePercentage}
          onMouseUp={handleInputMouseUp}
          value={playerStatus.currentPercentage}
        />
      </div>

      <div className='vpfr_player_controls_shadow' onClick={toggleVideoPlay} />

      <div className='vpfr_video_wrapper'>
        <video
          crossOrigin='true'
          preload='metadata'
          width={width || defaultWidth}
          height={height || undefined}
          ref={$videoPlayer}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleResetVideo}
          className='vpfr_video'
        >
          <source src={url} type={type} />
        </video>
        {poster && (
          <div
            className='vpfr_video_poster_image'
            style={{ backgroundImage: `url(${poster})` }}
          />
        )}
      </div>

      <button
        className='vpfr_overlay_play_button'
        onClick={toggleVideoPlay}
        style={{ display: playerStatus.playing ? 'none' : 'block' }}
      >
        Play
      </button>
    </div>
  )
}
