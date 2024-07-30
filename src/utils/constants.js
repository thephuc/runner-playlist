export const API_HOST = 'https://api.spotify.com'
export const TRACK_RECOMMENDATION_ENDPOINT = `${API_HOST}/v1/recommendations`;
export const TRACKS_FEATURE_ENDPOINT = `${API_HOST}/v1/audio-features`;
export const AUDIO_FEATURES_ENDPOINT = `${API_HOST}/v1/audio-features`;
export const GET_USER_PROFILE_ENDPOINT = `${API_HOST}/v1/me`
export const SEARCH_ENDPOINT = `${API_HOST}/v1/search`

const ACCOUNT_API_HOST = 'https://accounts.spotify.com'
export const AUTHORIZE_ACCOUNT_ENDPOINT = `${ACCOUNT_API_HOST}/authorize`
export const GET_ACCESS_TOKEN_ENDPOINT = `${ACCOUNT_API_HOST}/api/token`

//  if current_time < access_token_expiry_time - ACCESS_TOKEN_EXPIRY_THRESHOLD_MS,
//  then trigger API to get new access token
export const ACCESS_TOKEN_EXPIRY_THRESHOLD_MS = 60000

export const TRACK_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove'
}

export const SEARCH_TYPE = {
  ARTIST: 'artist',
  TRACK: 'track'
}