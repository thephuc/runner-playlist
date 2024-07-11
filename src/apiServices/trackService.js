import axiosInstance from "../axiosInstance"
import { TRACK_RECOMMENDATION_ENDPOINT } from "../utils/constants"


export const getRecommendedTracksApi = async ({tempo, genreStr}) => {
  let trackList = []
  try {
    const urlParams = new URLSearchParams({
      //  TODO: set dynamic seed_artists
      //seed_artists: '0SfsnGyD8FpIN4U4WCkBZ5',
      //seed_tracks: '',
      seed_genres: genreStr,
      target_tempo: tempo,
    })
    
    const getRecommendedTrackApiResp = await axiosInstance.get(`${TRACK_RECOMMENDATION_ENDPOINT}?${urlParams.toString()}`);
    const {data: { tracks}} = getRecommendedTrackApiResp;
    console.log(`total number of tracks: ${tracks.length}`)  
    trackList = tracks.map((trackInfo) => {
      const {id, name, preview_url: previewUrl, uri, href, external_urls: {spotify: spotifyUrl}, artists, album} = trackInfo;
      return {
        id, 
        name, 
        previewUrl,
        uri, 
        href, 
        spotifyUrl,
        artists,
        album,
        isSelected: true
      }
    })
    //  TODO: error handling
  } catch (e) {
    console.log("Failed to get track recommendation: ", e)
  }
  return trackList

}