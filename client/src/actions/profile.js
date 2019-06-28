import axios from "axios";
// import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

// get logged in user's profile

export const getCurrentProfile = () => async dispatch => {
  try {
    let token = localStorage.getItem("token");

    const res = await axios.get("/api/profile/me", {
      headers: {
        "x-auth-token": token
      }
    });

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
