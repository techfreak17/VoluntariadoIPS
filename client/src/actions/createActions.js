import axios from "axios";

import {
    GET_ERRORS,
} from "./types";

// Create Voluntary User
export const createVoluntary = (userData, history) => dispatch => {
    axios
        .post("/api/admin/createVoluntaryUser", userData)
        .then(res => history.push("/listUsers")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Create Company User
export const createCompany = (userData, history) => dispatch => {
    axios
        .post("/api/admin/createCompanyUser", userData)
        .then(res => history.push("/listUsers")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};