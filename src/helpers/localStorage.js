const USER = 'user-bookwell'
const SESSION = 'session-bookwell'

const storeUser = (user) => {
  const { id, session } = user

  localStorage.setItem(USER, id)
  if (session) {
    localStorage.setItem(SESSION, session)
  } else {
    localStorage.removeItem(SESSION)
  }
}

const removeUser = () => {
  localStorage.removeItem(USER)
  localStorage.removeItem(SESSION)
}

const getUser = () => {
  const id = localStorage.getItem(USER)
  const session = localStorage.getItem(SESSION)
  if (id && session) return { id, session }
}

export { removeUser, storeUser, getUser }