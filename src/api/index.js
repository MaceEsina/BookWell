import axios from 'axios'

const DEPLOY_ID = 'AKfycbz6Uc0N6IMgVuojohxYFzSTwtQqUpqlX7-IYg51hbreZ8_31HY85L7mq1lNfNye16B6MQ'
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
export const cancelBooking = (params) => (
  axios.get(`${API_URL}?method=cancel`, { params })
)