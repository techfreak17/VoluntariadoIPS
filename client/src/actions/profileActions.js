import axios from "axios";

import {
    GET_ERRORS
} from "./types";

// Edit Profile
export const editProfile = (userID, file, userData, history) => dispatch => {
    console.log(userData);
    axios
        .post("/api/users/updateUser/" + userID, userData)
        .then(res => {
            history.push("/dashboard")
            console.log(res.data);
            if (file !== null) {
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
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
