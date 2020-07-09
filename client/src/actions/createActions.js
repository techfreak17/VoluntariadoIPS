import axios from "axios";

import {
    GET_ERRORS,
} from "./types";

// Create Voluntary User
export const createVoluntary = (userData, file, history) => dispatch => {
    axios
        .post("/api/admin/createVoluntaryUser", userData)
        .then(res => {
            if (file) {
                file.append(
                    "type",
                    "Utilizador"
                )
                file.append(
                    "id",
                    res.data.userID
                )
                axios
                    .post("api/upload/file", file, {
                        headers: {
                            "Content-type": "multipart/form-data"
                      }
                    })
                    .then(history.push("/listUsers"));
            }else{
                history.push("/listUsers");
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Create Company User
export const createCompany = (userData, file, history) => dispatch => {
    axios
        .post("/api/admin/createCompanyUser", userData)
        .then(res => {
            if (file !== null) {
                file.append(
                    "type",
                    "Utilizador"
                )
                file.append(
                    "id",
                    res.data.responsibleID
                )
                axios
                    .post("api/upload/file", file, {
                        headers: {
                            "Content-type": "multipart/form-data"
                      }
                    })
                    .then(history.push("/listUsers"));
            }else{
                history.push("/listUsers");
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};