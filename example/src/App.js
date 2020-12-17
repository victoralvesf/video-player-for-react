import React from 'react'

import { ReactVideoPlayer } from 'video-player-for-react'
import 'video-player-for-react/dist/index.css'

const App = () => {
  return (
    <ReactVideoPlayer
      width='928px'
      url='https://vod-progressive.akamaized.net/exp=1608200223~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3602%2F14%2F368010126%2F1522081533.mp4~hmac=31a584e5e3cb2360347c9193602d18885678c0fd7df8af24bb40b6b4d9f7dff3/vimeo-prod-skyfire-std-us/01/3602/14/368010126/1522081533.mp4?download=1&filename=video.mp4#t=0.1'
      type='video/mp4'
      // poster='poster_url'
      // captions={captions}
    />
  )
}

export default App
