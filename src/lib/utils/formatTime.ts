export const formatTime = (time: number) => {
  if (time < 60) return Math.floor(time) + 's'
  if (time < 3600) return Math.floor(time / 60) + 'm'
  if (time >= 3600) return Math.floor(time / 3600) + 'h'
}