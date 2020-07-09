import axios from "axios";

import {
    GET_ERRORS
} from "./types";

// Create User
export const createUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/createUser", userData)
        .then(res => history.push("/listUsers")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Edit User
export const editUser = (userID, file, userData, history) => dispatch => {
    axios
        .post("/api/admin/updateUser/"+ userID, userData)
        .then(res => {
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
                    .then(history.push("/listUsers"));
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

