import React from 'react'

function OverlayPlayButton({ toggleVideoPlay, playerStatus }) {
  return (
    <button
      className='vpfr_overlay_play_button'
      onClick={toggleVideoPlay}
      style={{ opacity: playerStatus ? '0' : '1' }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='90'
        height='90'
        viewBox='-5 -5 90 90'
        fill='none'
      >
        <g clipPath='url(#clip0)'>
          <g filter='url(#filter0_d)'>
            <path
              d='M61.6749 43.1702L25.0894 63.1813C21.9846 64.8778 18 62.8236 18 59.4035V19.3813C18 15.9667 21.9788 13.907 25.0894 15.6089L61.6749 35.62C62.3811 36.0001 62.9682 36.5495 63.3766 37.2125C63.7849 37.8755 64 38.6285 64 39.3951C64 40.1618 63.7849 40.9148 63.3766 41.5778C62.9682 42.2408 62.3811 42.7902 61.6749 43.1702V43.1702Z'
              fill='white'
            />
          </g>
        </g>
        <defs>
          <filter
            id='filter0_d'
            x='-2'
            y='-5'
            width='86'
            height='88.7879'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='10' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow'
              result='shape'
            />
          </filter>
          <clipPath id='clip0'>
            <rect width='80' height='80' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </button>
  )
}

export default OverlayPlayButton
