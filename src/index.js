import React, { useState, useRef, useEffect } from 'react'

import PlayerControls from './components/PlayerControls'
import OverlayPlayButton from './components/OverlayPlayButton'

import ParseToTime from './utils/parseToTime'
import {
  checkFullscreen,
  triggerFullscreen
} from './utils/handleFullscreenHelper'

import './styles.css'

let mouseIsPressed = false

function usePlayerState($videoPlayer, $videoContainer) {
  const [playerStatus, setPlayerStatus] = useState({
    playing: false,
    stopped: true,
    duration: 0,
    currentPercentage: 0,
    currentTimeSeconds: 0,
    currentTime: '00:00',
    durationTime: '00:00',
    isFullscreen: false,
    isPIP: false,
    isMuted: false,
    volume: 100
  })

  useEffect(() => {
    playerStatus.playing ? playAndPause('play') : playAndPause('pause')
  }, [$videoPlayer, playerStatus.playing])

  useEffect(() => {
    if (playerStatus.isMuted) {
      setPlayerVolume(0)
    } else if (!playerStatus.isMuted && playerStatus.volume === 0) {
      setPlayerStatus({
        ...playerStatus,
        volume: 100
      })
    } else {
      setPlayerVolume(playerStatus.volume)
    }
  }, [$videoPlayer, playerStatus.isMuted])

  useEffect(() => {
    if (playerStatus.volume > 0) {
      if (playerStatus.isMuted) {
        setPlayerStatus({
          ...playerStatus,
          isMuted: false
        })
      }

      setPlayerVolume(playerStatus.volume)
    } else {
      setPlayerStatus({
        ...playerStatus,
        isMuted: true
      })
    }
  }, [$videoPlayer, playerStatus.volume])

  function playAndPause(status) {
    $videoPlayer.current[status]()

    status === 'play' &&
      setPlayerStatus({
        ...playerStatus,
        stopped: false
      })
  }

  useEffect(() => {
    const currentTime = $videoPlayer.current.currentTime
    const time = currentTime === playerStatus.duration ? 0 : currentTime

    setPlayerStatus({
      ...playerStatus,
      currentTimeSeconds: time
    })
  }, [$videoPlayer, playerStatus.currentPercentage])

  function toggleVideoPlay() {
    !playerStatus.playing ? playAndPause('play') : playAndPause('pause')

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

      const percentage = Number((currentTime / duration) * 100)

      setPlayerStatus({
        ...playerStatus,
        currentTimeSeconds: currentTime,
        currentPercentage: percentage,
        currentTime: ParseToTime(currentTime)
      })
    }
  }

  function handleChangePercentage(event) {
    const currentPercentageValue = Number(event.target.value)

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

  function handleDurationChange() {
    const duration = $videoPlayer.current.duration

    setPlayerStatus({
      ...playerStatus,
      duration: duration,
      durationTime: ParseToTime(duration)
    })
  }

  function handleFullscreenChange() {
    const fullscreen = checkFullscreen()

    setPlayerStatus({
      ...playerStatus,
      isFullscreen: fullscreen
    })
  }

  function toggleFullscreen() {
    triggerFullscreen($videoContainer, playerStatus.isFullscreen)
  }

  useEffect(() => {
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)
    document.addEventListener('MSFullscreenChange', handleFullscreenChange)
    document.addEventListener('fullscreenchange', handleFullscreenChange, false)
  }, [])

  async function handlePictureInPicture() {
    try {
      await $videoPlayer.current.requestPictureInPicture()

      setPlayerStatus({
        ...playerStatus,
        isPIP: !playerStatus.isPIP
      })
    } catch (error) {
      console.log('Error to start Picture in Picture. ' + error)
    }
  }

  function handleOnPlayAndPause() {
    setPlayerStatus({
      ...playerStatus,
      playing: !$videoPlayer.current.paused
    })
  }

  function handleMuteVolume() {
    setPlayerStatus({
      ...playerStatus,
      isMuted: !playerStatus.isMuted
    })
  }

  function handleVolumeChange(event) {
    const volume = Number(event.target.value)

    setPlayerStatus({
      ...playerStatus,
      volume: volume
    })
  }

  function setPlayerVolume(volume) {
    $videoPlayer.current.volume = volume / 100
  }

  return {
    playerStatus,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangePercentage,
    handleInputMouseDown,
    handleInputMouseUp,
    handleResetVideo,
    isPlayerStopped,
    handleDurationChange,
    toggleFullscreen,
    handlePictureInPicture,
    handleOnPlayAndPause,
    handleMuteVolume,
    handleVolumeChange
  }
}

export const ReactVideoPlayer = ({
  width,
  height,
  url,
  type,
  poster,
  captions
}) => {
  const $videoPlayer = useRef(null)
  const $videoContainer = useRef(null)

  const {
    playerStatus,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangePercentage,
    handleInputMouseDown,
    handleInputMouseUp,
    handleResetVideo,
    isPlayerStopped,
    handleDurationChange,
    toggleFullscreen,
    handlePictureInPicture,
    handleOnPlayAndPause,
    handleMuteVolume,
    handleVolumeChange
  } = usePlayerState($videoPlayer, $videoContainer)

  const tracks =
    captions &&
    captions.map((caption) => (
      <track
        key={caption.srcLang}
        kind={caption.kind}
        label={caption.label}
        srcLang={caption.srcLang}
        src={caption.src}
      />
    ))

  return (
    <div
      tabIndex='0'
      className={`vpfr_container ${isPlayerStopped()}`}
      ref={$videoContainer}
    >
      <PlayerControls
        toggleVideoPlay={toggleVideoPlay}
        playerStatus={playerStatus}
        handleChangePercentage={handleChangePercentage}
        handleInputMouseDown={handleInputMouseDown}
        handleInputMouseUp={handleInputMouseUp}
        toggleFullscreen={toggleFullscreen}
        handlePictureInPicture={handlePictureInPicture}
        showCaptions={captions}
        handleMuteVolume={handleMuteVolume}
        handleVolumeChange={handleVolumeChange}
      />

      <div className='vpfr_video_wrapper'>
        <video
          controls={false}
          crossOrigin='true'
          preload='metadata'
          width={!playerStatus.isFullscreen && width}
          height={height || undefined}
          ref={$videoPlayer}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleResetVideo}
          onDurationChange={handleDurationChange}
          onPause={handleOnPlayAndPause}
          onPlay={handleOnPlayAndPause}
          className='vpfr_video'
          poster={poster || 'none'}
        >
          <source src={url} type={type} />
          {captions && tracks}
        </video>

        {poster && (
          <div
            className='vpfr_video_poster_image'
            style={{ backgroundImage: `url(${poster})` }}
          />
        )}
      </div>

      {captions && (
        <div className='vpfr_video_captions'>
          <span className='vpfr_caption_text'>Exemplo de legenda</span>
        </div>
      )}

      <OverlayPlayButton
        toggleVideoPlay={toggleVideoPlay}
        playerStatus={playerStatus.playing}
      />
    </div>
  )
}
