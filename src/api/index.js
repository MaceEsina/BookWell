import axios from 'axios'

const DEPLOY_ID = 'AKfycbxszntOVVx-yYa2M9lrbyA7W1gc86GiXH_j-ZuZd3ItjFpPBKCJI1MEB2st8mCUPLLUIQ'
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