import React, { Fragment, useEffect, useState } from 'react'
import { isIE, isFirefox, isOpera } from 'react-device-detect'
import {
  MdPlayArrow,
  MdPause,
  MdVolumeUp,
  MdVolumeOff,
  MdSubtitles,
  MdOpenInNew,
  MdFullscreen,
  MdFullscreenExit
} from 'react-icons/md'

function PlayerControls({
  toggleVideoPlay,
  playerStatus,
  handleChangePercentage,
  handleInputMouseDown,
  handleInputMouseUp,
  toggleFullscreen,
  handlePictureInPicture,
  showCaptions,
  handleMuteVolume,
  handleVolumeChange
}) {
  const [pictureInPictureSupport, setPictureInPictureSupport] = useState(true)

  useEffect(() => {
    setPictureInPictureSupport(!(isIE || isFirefox || isOpera))
  }, [])

  function handleVolumeBar() {
    return playerStatus.isMuted ? 0 : playerStatus.volume
  }

  return (
    <Fragment>
      <div className='vpfr_player_controls'>
        <div className='vpfr_player_item'>
          <button onClick={toggleVideoPlay}>
            {playerStatus.playing ? (
              <MdPause
                aria-hidden='true'
                focusable='false'
                size={24}
                style={{ padding: '6px' }}
              />
            ) : (
              <MdPlayArrow
                aria-hidden='true'
                focusable='false'
                size={24}
                style={{ padding: '6px' }}
              />
            )}
          </button>
        </div>

        <div className='vpfr_player_item vpfr_time_progress'>
          <div className='vpfr_timers'>{playerStatus.currentTime}</div>

          <div className='vpfr_time_progress_fields'>
            {/* <progress
              className='vpfr_time_progress_back'
              max='100'
              value={playerStatus.currentPercentage}
            /> */}
            <input
              type='range'
              min='0'
              max='100'
              step='0.01'
              className='vpfr_time_progress_bar'
              onMouseDown={handleInputMouseDown}
              onChange={handleChangePercentage}
              onMouseUp={handleInputMouseUp}
              value={playerStatus.currentPercentage}
              role='slider'
              aria-label='Seek'
              style={{
                '--progress': `${playerStatus.currentPercentage}%`
              }}
            />
          </div>

          <div className='vpfr_timers'>{playerStatus.durationTime}</div>
        </div>

        <div className='vpfr_player_item vpfr_volume'>
          <button onClick={handleMuteVolume}>
            {playerStatus.isMuted ? (
              <MdVolumeOff
                aria-hidden='true'
                focusable='false'
                size={22}
                style={{ padding: '7px' }}
              />
            ) : (
              <MdVolumeUp
                aria-hidden='true'
                focusable='false'
                size={22}
                style={{ padding: '7px' }}
              />
            )}
          </button>

          <div className='vpfr_volume_progress_fields'>
            <input
              className='vpfr_volume_progress_bar'
              type='range'
              min='0'
              max='100'
              value={handleVolumeBar()}
              onChange={handleVolumeChange}
              style={{ '--progress': `${handleVolumeBar()}%` }}
            />
          </div>
        </div>

        {showCaptions && (
          <div className='vpfr_player_item vpfr_captions'>
            <button>
              <MdSubtitles
                aria-hidden='true'
                focusable='false'
                size={22}
                style={{ padding: '7px' }}
              />
            </button>
          </div>
        )}

        {pictureInPictureSupport && (
          <div className='vpfr_player_item vpfr_picture_in_picture'>
            <button onClick={handlePictureInPicture}>
              <MdOpenInNew
                aria-hidden='true'
                focusable='false'
                size={22}
                style={{ padding: '7px' }}
              />
            </button>
          </div>
        )}

        <div className='vpfr_player_item vpfr_fullscreen'>
          <button onClick={toggleFullscreen}>
            {playerStatus.isFullscreen ? (
              <MdFullscreenExit aria-hidden='true' focusable='false' />
            ) : (
              <MdFullscreen aria-hidden='true' focusable='false' />
            )}
          </button>
        </div>
      </div>

      <div className='vpfr_play_pause_on_click' onClick={toggleVideoPlay} />
    </Fragment>
  )
}

export default PlayerControls
