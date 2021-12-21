
// 时间过滤
export const formatTime = (val) => {
  const newDate = new Date(val)
  const y = newDate.getFullYear()
  const m = (newDate.getMonth() + 1).toString().padStart(2, 0)
  const d = (newDate.getDate()).toString().padStart(2, 0)
  return `${y}-${m}-${d}`
}
