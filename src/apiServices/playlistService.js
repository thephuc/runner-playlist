import axiosInstance from "../axiosInstance"
import { API_HOST } from "../utils/constants"

const getCreateNewPlaylistApiUrl = (userId) => `${API_HOST}/v1/users/${userId}/playlists`
const getAddTrackToPlaylistApiUrl = (playlistId) => `${API_HOST}/v1/playlists/${playlistId}/tracks`

export const createNewPlaylistApi = async ({userId, playlistData}) => {
  const { name, isPublic, description } = playlistData
  const payload = { name, public: isPublic, description}
  try {
    const apiUrl = getCreateNewPlaylistApiUrl(userId)
    const createPlaylistResp = await axiosInstance.post(`${apiUrl}`, payload);
    const {data: { id, href, images, name, public: isPublic, tracks, uri}} = createPlaylistResp;
    return { id, href, images, name, isPublic, tracks, uri}
    //  TODO: error handling
  } catch (e) {
    console.error("Failed to create new playlist: ", e)
    return 
  }
}

export const addTracksToPlaylistApi = async ({playlistId, trackUriList}) => {
  if (!playlistId || !trackUriList || trackUriList.length == 0) {
    console.error("missing data to add tracks to playlist");
    return 
  }
  
  try {
    const payload = { uris: trackUriList }
    const apiUrl = getAddTrackToPlaylistApiUrl(playlistId)
    const addTracksToPlaylistResp = await axiosInstance.post(`${apiUrl}`, payload);
    const {data: { snapshot_id: snapshotId }} = addTracksToPlaylistResp;
    return { snapshotId }
    //  TODO: error handling
  } catch (e) {
    console.error(`Failed to add track to new playlist ID: ${playlistId}`, e)
    return 
  }

}