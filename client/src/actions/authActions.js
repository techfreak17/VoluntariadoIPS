import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

// Register User
export const registerVoluntary = (userData, file, history) => dispatch => {
    axios
        .post("/api/users/registerVoluntary", userData)
        .then(res => {
            if (file) {
                file.append(
                    "type",
                    "Utilizador"
                )
                file.append(
                    "id",
                    res.data._id
                )
                axios
                    .post("api/upload/file", file)
                    .then(history.push("/confirmAccount"));
            } else {
                history.push("/confirmAccount");
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Register User
export const registerCompany = (userData, file, history) => dispatch => {
    axios
        .post("/api/users/registerCompany", userData)
        .then(res => {
            if (file) {
                file.append(
                    "type",
                    "Utilizador"
                )
                file.append(
                    "id",
                    res.data._id
                )
                axios
                    .post("api/upload/file", file)
                    .then(history.push("/confirmAccount"));
            } else {
                history.push("/confirmAccount");
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Register User
export const confirmToken = (tokenData, history) => dispatch => {
    axios
        .post("/api/users/confirmtoken", tokenData)
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// update password
export const updatePassword = (passData, history) => dispatch => {
    axios
        .post("/api/users/updatePassword", passData)
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {

            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            // Set token to Auth header
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);
            console.log(decoded);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Recover User
export const recoverUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/recover", userData)
        .then(res => history.push("/recoverconfirm")) // re-direct to page after email sent
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");

    // Remove auth header for future requests
    setAuthToken(false);

    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};