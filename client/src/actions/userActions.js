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

