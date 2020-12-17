// export default function parseToTime(time) {
//   const timeInt = parseInt(time, 0)

//   function formatEachPart(part) {
//     return part < 10 ? `0${part}` : part
//   }

//   const hour = Math.floor(timeInt / 3600)
//   const minute = Math.floor(timeInt / 60) % 60
//   const seconds = timeInt % 60

//   const formattedMinute = formatEachPart(minute)
//   const formattedSeconds = formatEachPart(seconds)

//   if (parseInt(hour, 0) === 0) {
//     return `${formattedMinute}:${formattedSeconds}`
//   }

//   const formattedHour = formatEachPart(hour)

//   return `${formattedHour}:${formattedMinute}:${formattedSeconds}`
// }

export default function parseToTime(time) {
  // Generate a full date (1970-01-01T00:03:03.000Z)
  // With substr we get only the hour part.
  const fullTime = new Date(time * 1000).toISOString().substr(11, 8)

  if (fullTime.substr(0, 3) === '00:') {
    return fullTime.substr(3)
  }

  return fullTime
}
