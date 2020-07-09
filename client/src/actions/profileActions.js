import axios from "axios";

import {
    GET_ERRORS
} from "./types";

// Edit Profile
export const editProfile = (userID, file, userData, history) => dispatch => {
    axios
        .post("/api/users/updateUser/" + userID, userData)
        .then(res => {
            console.log(res.data);
            if (file) {
                file.append(
                    "type",
                    "Utilizador"
                )
                file.append(
                    "id",
                    res.data[0]._id
                )
                axios
                    .post("api/upload/file", file)
                    .then(history.push("/dashboard"));
            } else {
                history.push("/dashboard");
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
