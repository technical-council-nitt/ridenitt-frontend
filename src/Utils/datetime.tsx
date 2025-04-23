export const age = (n: number) => {
  if (n < 1000) {
    return 'Just now'
  } else if (n < 60000) {
    return `${Math.floor(n / 1000)} second${n / 1000 >= 2 ? 's' : ''} ago`
  } else if (n < 3600000) {
    return `${Math.floor(n / 60000)} minute${n / 60000 >= 2 ? 's' : ''} ago`
  } else if (n < 86400000) {
    return `${Math.floor(n / 3600000)} hour${n / 3600000 >= 2 ? 's' : ''} ago`
  } else if (n < 2592000000) {
    return `${Math.floor(n / 86400000)} day${n / 86400000 >= 2 ? 's' : ''} ago`
  } else if (n < 31536000000) {
    return `${Math.floor(n / 2592000000)} month${n / 2592000000 >= 2 ? 's' : ''} ago`
  } else {
    return `${Math.floor(n / 31536000000)} year${n / 31536000000 >= 2 ? 's' : ''} ago`
  }
}

// Utility to normalize date to ignore time part for comparison
const normalizeDate = (date: Date) => {
  const normalized = new Date(date)
  normalized.setHours(0, 0, 0, 0) // Set to midnight to ignore time part
  return normalized
}

const isSameDay = (d1: Date, d2: Date) =>
  normalizeDate(d1).getTime() === normalizeDate(d2).getTime()

const isTomorrow = (d1: Date, d2: Date) => {
  const temp = new Date(d1)
  temp.setDate(temp.getDate() + 1)
  return isSameDay(temp, d2)
}

const isYesterday = (d1: Date, d2: Date) => {
  const temp = new Date(d1)
  temp.setDate(temp.getDate() - 1)
  return isSameDay(temp, d2)
}

export const displayTimeRange = (st: Date, ed: Date, cmp: Date | false) => {
  const [today, tomorrow, yesterday] =
    cmp === false
      ? [false, false, false]
      : [isSameDay(st, cmp), isTomorrow(cmp, st), isYesterday(cmp, st)]

  return (
    <span className="">
      <span className="max-sm:block sm:mr-1">
        {today
          ? 'Today'
          : tomorrow
          ? 'Tomorrow'
          : yesterday
          ? 'Yesterday'
          : st.toLocaleDateString('default', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            })}
      </span>
      <span>
        {st.getHours() % 12 || 12}:{st.getMinutes().toString().padStart(2, '0')}{' '}
        {st.getHours() >= 12 ? 'PM' : 'AM'} - {ed.getHours() % 12 || 12}:
        {ed.getMinutes().toString().padStart(2, '0')} {ed.getHours() >= 12 ? 'PM' : 'AM'}
      </span>
    </span>
  )
}
