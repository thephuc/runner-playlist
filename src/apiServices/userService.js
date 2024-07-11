import axiosInstance from "../axiosInstance"
import { GET_USER_PROFILE_ENDPOINT } from "../utils/constants"


export const getUserProfileApi = async () => {
  const userProfile = await axiosInstance.get(GET_USER_PROFILE_ENDPOINT);
  //  TODO: error handling
  return userProfile
}