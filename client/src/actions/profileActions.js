import axios from "axios";

import {
    GET_ERRORS
} from "./types";

// Edit Profile
export const editProfile = (userID, file, userData, history) => dispatch => {
    axios
        .post("/api/users/updateUser/"+ userID, userData)
        .then(res => {
            history.goBack()
            if (file !== null) {
                file.append(
                    "type",
                    "Utilizador"
                )
                file.append(
                    "id",
                    res.data._id
                )
                console.log(file);
                axios
                    .post("api/upload", file)
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
