import React from 'react'

import { ExampleComponent } from 'video-player-for-react'
import 'video-player-for-react/dist/index.css'

const videoURL =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
const videoPoster =
  'https://images.anandtech.com/doci/10729/ChromecastLaunch.jpg'

const App = () => {
  return (
    <ExampleComponent
      width='928px'
      url={videoURL}
      type='video/mp4'
      poster={videoPoster}
    />
  )
}

export default App
