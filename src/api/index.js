import axios from 'axios'

const DEPLOY_ID = 'AKfycbyrIxmtkZUR8BfH_r2NXLMCfcmpCZFC10OT8vylNEmRq4qkggt3D53OuZLCuzbfCEa7gg'
const API_URL = `https://script.google.com/macros/s/${DEPLOY_ID}/exec`

export const getStart = (session) => (
  axios.get(`${API_URL}?session=${session}`)
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