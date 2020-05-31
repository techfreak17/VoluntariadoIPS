import axios from "axios";

import {
    GET_ERRORS,
} from "./types";

// Register User
export const createVoluntary = (userData, history) => dispatch => {
    axios
        .post("/api/users/registerVoluntary", userData)
        .then(res => history.push("/listUsers")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Register User
export const createCompany = (userData, history) => dispatch => {
    axios
        .post("/api/users/registerCompany", userData)
        .then(res => history.push("/listUsers")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};