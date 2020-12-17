import React from 'react'

import { ReactVideoPlayer } from 'video-player-for-react'
import 'video-player-for-react/dist/index.css'

// const videoURL =
// 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
const videoURL =
  'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4'
// const videoPoster =
// 'https://images.anandtech.com/doci/10729/ChromecastLaunch.jpg'
const videoPoster =
  'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg'

// const captions = [
//   {
//     kind: 'captions',
//     label: 'English',
//     srcLang: 'en',
//     src:
//       'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt'
//   }
// ]

const App = () => {
  return (
    <ReactVideoPlayer
      width='928px'
      url={videoURL}
      type='video/mp4'
      poster={videoPoster}
      // captions={captions}
    />
  )
}

export default App
