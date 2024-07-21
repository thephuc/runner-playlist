import axiosInstance from "../axiosInstance"
import { SEARCH_ENDPOINT } from "../utils/constants"


export const getSearchApi = async (queryStr) => {
  let searchResult = {trackData: {}, artistData: {}}
  try {
    const urlParams = new URLSearchParams({
      //  TODO: consider setting type=album and use all songs in that album for recommendation seed
      type: 'artist,track',
      q: queryStr,
      limit: 30
    })
    
    const getSearchResp = await axiosInstance.get(`${SEARCH_ENDPOINT}?${urlParams.toString()}`);
    const {data: { tracks, artists}} = getSearchResp;
    searchResult.trackData = tracks;
    searchResult.artistData = artists;

    //  TODO: error handling
  } catch (e) {
    console.error("Failed to search for track and artist: ", e)
  }
  return searchResult

}