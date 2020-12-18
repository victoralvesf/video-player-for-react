import React, { Fragment } from 'react'
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
  handleFullscreen,
  handlePictureInPicture,
  showCaptions,
  handleMuteVolume,
  handleVolumeChange
}) {
  function handleProgressBar() {
    if (playerStatus.currentPercentage < 40) {
      return playerStatus.currentPercentage + 1.25
    } else {
      return playerStatus.currentPercentage - 0.5
    }
  }

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
            <progress
              className='vpfr_time_progress_back'
              max='100'
              value={handleProgressBar()}
            />
            <input
              type='range'
              min='0'
              max='100'
              className='vpfr_time_progress_bar'
              onMouseDown={handleInputMouseDown}
              onChange={handleChangePercentage}
              onMouseUp={handleInputMouseUp}
              value={playerStatus.currentPercentage}
              role='slider'
              aria-label='Seek'
              aria-valuemin='0'
              aria-valuemax={playerStatus.duration}
              aria-valuenow={playerStatus.currentTimeSeconds}
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
            <progress
              className='vpfr_volume_progress_back'
              max='100'
              value={handleVolumeBar()}
            />
            <input
              className='vpfr_volume_progress_bar'
              type='range'
              min='0'
              max='100'
              value={handleVolumeBar()}
              onChange={handleVolumeChange}
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

        <div className='vpfr_player_item vpfr_fullscreen'>
          <button onClick={handleFullscreen}>
            {playerStatus.isFullscreen ? (
              <MdFullscreenExit aria-hidden='true' focusable='false' />
            ) : (
              <MdFullscreen aria-hidden='true' focusable='false' />
            )}
          </button>
        </div>
      </div>

      <div className='vpfr_play_pause_on_click' onClick={toggleVideoPlay} />

      <div className='vpfr_player_controls_shadow' />
    </Fragment>
  )
}

export default PlayerControls
