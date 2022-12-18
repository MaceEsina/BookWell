function parseDate(dateIso) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const date = new Date(dateIso)
  return date.toLocaleDateString(undefined, options)
}

export { parseDate }