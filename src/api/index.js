import axios from 'axios'

const DEPLOY_ID = 'AKfycbyyL589i96ecvKR0xn9fm1tGIvWAdu-qEUsonnH1mKv2e-WrtYbz-Hiy5vvZTi90567EA'
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