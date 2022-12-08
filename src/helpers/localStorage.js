const USER = 'user-bookwell'
const SESSION = 'user-bookwell'

const storeUser = (user) => {
  const { id, session } = user

  if (session) {
    localStorage.setItem(SESSION, session)
    localStorage.setItem(USER, id)
  } else {
    localStorage.removeItem(USER)
    localStorage.removeItem(SESSION)
  }
}

const getUser = () => {
  const id = localStorage.getItem(USER)
  const session = localStorage.getItem(SESSION)
  if (id && session) return { id, session }
}

export { storeUser, getUser }