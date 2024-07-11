const ACCOUNT_API_HOST = 'https://accounts.spotify.com'
export const API_HOST = 'https://api.spotify.com'
export const TRACK_RECOMMENDATION_ENDPOINT = `${API_HOST}/v1/recommendations`;
export const AUDIO_FEATURES_ENDPOINT = `${API_HOST}/v1/audio-features`;
export const GET_USER_PROFILE_ENDPOINT = `${API_HOST}/v1/me`

export const AUTHORIZE_ACCOUNT_ENDPOINT = `${ACCOUNT_API_HOST}/authorize`
export const GET_ACCESS_TOKEN_ENDPOINT = `${ACCOUNT_API_HOST}/api/token`

export const TRACK_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove'
}