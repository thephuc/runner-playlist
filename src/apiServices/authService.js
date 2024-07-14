import axiosInstance from "../axiosInstance";
import { ACCESS_TOKEN_EXPIRY_THRESHOLD_MS, GET_ACCESS_TOKEN_ENDPOINT } from "../utils/constants";

const processGetTokenResp = (apiResp) => {
  const response = {accessToken: null, refreshToken: null, expiryTime: null}
  console.log(apiResp)
  const {data: {access_token, refresh_token, expires_in}} = apiResp;
  response.accessToken = access_token
  response.refreshToken = refresh_token
  response.expiryTime = Date.now() + expires_in * 1000 - ACCESS_TOKEN_EXPIRY_THRESHOLD_MS
  return response
}

export const getFirstAccessTokenApi = async (code) => {
  console.log('getting first access token')
  let response = {accessToken: null, refreshToken: null, expiresIn: null}
  try {
    const payload = {   
      grant_type: 'authorization_code',
      code,
      // eslint-disable-next-line no-undef
      redirect_uri: process.env.REACT_APP_REDIRECT_URI
    }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      // eslint-disable-next-line no-undef
      'Authorization': 'Basic ' + window.btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)
    }
    const apiResp = await axiosInstance.post(GET_ACCESS_TOKEN_ENDPOINT, payload, {headers});
    response = processGetTokenResp(apiResp)
  } catch (e) {
    console.error("Failed to get first Access Token: ", e)
  }
  return response;
}

export const getRefreshedAccessTokenApi = async (refreshToken) => {
  // refresh token that has been previously stored
  let response = {accessToken: null, refreshToken: null, expiresIn: null}

  try {
    const payload = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      // eslint-disable-next-line no-undef
      client_id: process.env.REACT_APP_CLIENT_ID
    }
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const apiResp = await axiosInstance.post(GET_ACCESS_TOKEN_ENDPOINT, payload, {headers});
    response = processGetTokenResp(apiResp)

  } catch (e) {
    console.error("Failed to get refreshed Access Token: ", e)
  }
  
  return response 
}