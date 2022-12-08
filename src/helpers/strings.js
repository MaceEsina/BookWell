function toStr(value) {
  if (value === undefined || value === null) {
    return '';
  }

  return value.toString().trim();
}

const fixStr = (value) => toStr(value).toLowerCase()

export { toStr, fixStr }