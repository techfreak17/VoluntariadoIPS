import axios from "axios";

import {
    GET_ERRORS
} from "./types";

// Create Project
export const createProject = (projectData, file, history) => dispatch => {
    axios
        .post("/api/projects/createProject", projectData)
        .then(res => {
            history.push("/listProjects")
            if (file !== null) {
                file.append(
                    "type",
                    "Projeto"
                )
                file.append(
                    "id",
                    res.data._id
                )
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

// Submit Project
export const submitProject = (projectData, file, history) => dispatch => {
    axios
        .post("/api/submitedProjects/submitCreateProject", projectData)
        .then(res => {
            history.push("/listSubmitedProjects")
            if (file !== null) {
                file.append(
                    "type",
                    "Submissao Projeto"
                )
                file.append(
                    "id",
                    res.data._id
                )
                console.log(file);
                axios
                    .post("api/upload", file)
            }
        }).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Edit Project
export const editProject = (projectID, file, projectData, history) => dispatch => {
    axios
        .post("/api/projects/updateProject/" + projectID, projectData)
        .then(res => {
            history.push("/listProjects")
            if (file !== null) {
                file.append(
                    "type",
                    "Projeto"
                )
                file.append(
                    "id",
                    res.data._id
                )
                axios
                    .post("api/upload", file)
            }
        }).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};





