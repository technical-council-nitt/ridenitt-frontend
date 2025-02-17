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
    return `${Math.floor(n / 31536000000)} years ago`
  }
}

export const displayTimeRange = (st: Date, ed: Date, cmp: Date | false) => {
  const [isToday, isTomorrow, isYesterday] = cmp === false ? [false, false, false] : [st.getDate() === cmp?.getDate() && st.getMonth() === cmp?.getMonth() && st.getFullYear() === cmp?.getFullYear(), st.getDate() === cmp?.getDate() + 1 && st.getMonth() === cmp?.getMonth() && st.getFullYear() === cmp?.getFullYear(), st.getDate() === cmp?.getDate() - 1 && st.getMonth() === cmp?.getMonth() && st.getFullYear() === cmp?.getFullYear()]

  return (
    <span className="">
      <span className="max-sm:block sm:mr-1">
        {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : isYesterday ? 'Yesterday' : st.toLocaleString('default', { month: 'short', day: '2-digit', year: 'numeric' })}
      </span>
      <span>
        {st.getHours() % 12}: {st.getMinutes().toString().padStart(2, '0')} {st.getHours() > 11 ? 'PM' : 'AM'} - {ed.getHours() % 12}: {ed.getMinutes().toString().padStart(2, '0')} {ed.getHours() > 11 ? 'PM' : 'AM'}
      </span>
    </span>
  )
}