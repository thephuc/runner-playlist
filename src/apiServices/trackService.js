import axiosInstance from "../axiosInstance"
import { TRACK_RECOMMENDATION_ENDPOINT, TRACKS_FEATURE_ENDPOINT } from "../utils/constants"


export const getRecommendedTracksApi = async ({tempo, seedArtistStr, seedTrackStr}) => {
  let trackList = []
  try {
    const urlParams = new URLSearchParams({
      //target_tempo: tempo,
      min_tempo: tempo - 2,
      max_tempo: tempo + 2,
      //min_popularity: 70,
      //max_popularity: 95,
      limit: 30
    })

    if (seedArtistStr) {
      urlParams.append('seed_artists', seedArtistStr)
    }
    if (seedTrackStr) {
      urlParams.append('seed_tracks', seedTrackStr)
    }
    
    const getRecommendedTrackApiResp = await axiosInstance.get(`${TRACK_RECOMMENDATION_ENDPOINT}?${urlParams.toString()}`);
    const {data: { tracks}} = getRecommendedTrackApiResp;
    const filteredTracks = tracks.filter((track) => track?.id && track?.uri)
    console.log(`total number of valid tracks with ID and URI: ${filteredTracks.length}`)  
    trackList = filteredTracks.map((trackInfo) => {
      const {id, name, preview_url: previewUrl, uri, href, external_urls: {spotify: spotifyUrl}, artists, album, popularity} = trackInfo;
      return {
        id, 
        name, 
        previewUrl,
        uri, 
        href, 
        spotifyUrl,
        artists,
        album,
        isSelected: true,
        popularity
      }
    })
    //trackList.sort(function (a, b){
    //  //  TODO: consider using string comparison
    //  return new Date(b?.album?.release_date) - new Date(a?.album?.release_date)
    //})
    //  TODO: error handling
  } catch (e) {
    console.error("Failed to get track recommendation: ", e)
  }
  return trackList

}





export const getMultipleTracksFeatureApi = async (trackIdList) => {
  let trackList = []
  try {
    const urlParams = new URLSearchParams({
      ids: trackIdList.join(',')
    })
    
    const getMultipleTracksFeatureResp = await axiosInstance.get(`${TRACKS_FEATURE_ENDPOINT}?${urlParams.toString()}`);
    const {data: { audio_features: trackFeatures }} = getMultipleTracksFeatureResp;
    console.log(`total number of track feature items returned: ${trackFeatures.length}`)  
    trackList = trackFeatures
  } catch (e) {
    console.error("Failed to get multiple track features: ", e)
  }
  return trackList
}