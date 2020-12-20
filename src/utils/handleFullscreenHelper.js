/**
 * @name checkFullscreen
 * @function
 * @desc return if the page is on fullscreen
 * @return {Boolean}
 * @author victoralvesf
 */
export const checkFullscreen = () => {
  let fullscreen = false

  if (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreen ||
    document.webkitIsFullScreene ||
    document.fullScreenMode
  ) {
    fullscreen = true
  }

  return fullscreen
}

export const triggerFullscreen = ($videoContainer, isFullscreen) => {
  const el = $videoContainer.current

  if (!isFullscreen) {
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
}
