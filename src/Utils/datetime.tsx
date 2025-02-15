export const age = (n: number) => {
  if (n < 1000) {
    return 'Just now'
  } else if (n < 60000) {
    return `${Math.floor(n / 1000)} seconds ago`
  } else if (n < 3600000) {
    return `${Math.floor(n / 60000)} minutes ago`
  } else if (n < 86400000) {
    return `${Math.floor(n / 3600000)} hours ago`
  } else if (n < 2592000000) {
    return `${Math.floor(n / 86400000)} days ago`
  } else if (n < 31536000000) {
    return `${Math.floor(n / 2592000000)} months ago`
  } else {
    return `${Math.floor(n / 31536000000)} years ago`
  }
}