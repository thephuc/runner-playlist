import axiosInstance from "../axiosInstance"
import { TRACK_RECOMMENDATION_ENDPOINT } from "../utils/constants"


export const getRecommendedTracksApi = async ({tempo, seedArtistStr}) => {
  let trackList = []
  try {
    const urlParams = new URLSearchParams({
      seed_artists: seedArtistStr,
      //seed_tracks: '',
      //seed_genres: genreStr,
      target_tempo: tempo,
      //min_popularity: 70,
      //max_popularity: 95,
      limit: 100
    })
    
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