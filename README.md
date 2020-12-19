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

## CodeSandbox demo

![https://codesandbox.io/s/video-player-for-react](https://codesandbox.io/s/video-player-for-react-9lc1q?file=/src/App.js:319-594)

## Getting started

```jsx
import React from 'react'

import { ReactVideoPlayer } from 'video-player-for-react'
import 'video-player-for-react/dist/index.css'

const App = () => {
  return (
    <ReactVideoPlayer
      width='928px'
      url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      type='video/mp4'
      poster='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
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

export default App
```

## License

MIT © [victoralvesf](https://github.com/victoralvesf)
