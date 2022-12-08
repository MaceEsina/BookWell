import axios from 'axios'

const DEPLOY_ID = 'AKfycbzQTPbiv2MwPs4srho0ASTddB3MWDPnnsB5SWCHuBFRTmALPLwOvIcqUqUr_0ag9uJ_nQ'
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