# video-player-for-react

> a react video player component base

[![NPM](https://img.shields.io/npm/v/video-player-for-react.svg)](https://www.npmjs.com/package/video-player-for-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Disclaimer

- This library is currently in alpha version, **DO NOT** use in production!

## Functions

|                               |                    |
| ----------------------------- | ------------------ |
| Play/Pause                    | :heavy_check_mark: |
| Navigation with progress bar  | :heavy_check_mark: |
| Enter Picture-In-Picture mode | :heavy_check_mark: |
| Click on video to Play/Pause  | :heavy_check_mark: |
| Overlay play button           | :heavy_check_mark: |
| Mute                          | :x:                |
| Ajust volume                  | :x:                |
| Enter in fullscreen mode      | :x:                |
| Select subtitles              | :x:                |
| Show subtitles                | :x:                |

## Install

```bash
npm install --save video-player-for-react
```

## Getting started

```jsx
const React = require('react')

const { ReactVideoPlayer } = require('video-player-for-react')
require('video-player-for-react/dist/index.css')

const App = () => {
  return (
    <ReactVideoPlayer
      width='928px'
      url='https://vod-progressive.akamaized.net/exp=1608200223~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3602%2F14%2F368010126%2F1522081533.mp4~hmac=31a584e5e3cb2360347c9193602d18885678c0fd7df8af24bb40b6b4d9f7dff3/vimeo-prod-skyfire-std-us/01/3602/14/368010126/1522081533.mp4?download=1&filename=video.mp4'
      type='video/mp4'
      // poster='poster_url'
      // captions={[
      //   {
      //     kind: 'captions',
      //     label: 'English',
      //     srcLang: 'en',
      //     src: 'caption_url'
      //   }
      // ]}
    />
  )
}

module.exports = App
```

## License

MIT © [victoralvesf](https://github.com/victoralvesf)
