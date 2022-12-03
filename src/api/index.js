import axios from 'axios'

const DEPLOY_ID = 'AKfycbzxXq3MqCWbfFGt7WNWLkaYxJTEB3fjiHih9qbaUlz121BAxcH1pAf1PkLPalTBpABEaA'
const API_URL = `https://script.google.com/macros/s/${DEPLOY_ID}/exec`

export const getStart = (session) => (
  axios.get(`${API_URL}?session=${session}`)
)
export const signin = (params) => (
  axios.get(`${API_URL}?method=signin`, { params })
)