import axios from 'axios'

const DEPLOY_ID = 'AKfycbx8EG235UkY6b3b99NQJuu6-OuIM4Z40OToGcBRBH3AMlL92avWDmYIUs2n1B4GH-DzPQ'
const API_URL = `https://script.google.com/macros/s/${DEPLOY_ID}/exec`

export const getStart = (params) => (
  axios.get(`${API_URL}?method=auth`, { params })
)
export const signin = (params) => (
  axios.get(`${API_URL}?method=signin`, { params })
)
export const signup = (params) => (
  axios.get(`${API_URL}?method=signup`, { params })
)
export const resetPassword = (params) => (
  axios.get(`${API_URL}?method=resetPassword`, { params })
)
export const book = (params) => (
  axios.get(`${API_URL}?method=book`, { params })
)
export const getBookings = (params) => (
  axios.get(`${API_URL}?method=bookings`, { params })
)