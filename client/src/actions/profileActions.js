import axios from "axios";

import {
    GET_ERRORS
} from "./types";

// Edit Admin Profile
export const editProfile = (userID, userData, history) => dispatch => {
    axios
        .post("/api/users/updateUser/"+ userID, userData)
        .then(res => history.goBack()
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
