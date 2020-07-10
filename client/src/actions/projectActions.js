import axios from "axios";

import {
    GET_ERRORS
} from "./types";

// Create Project
export const createProject = (projectData, file, history) => dispatch => {
    axios
        .post("/api/projects/createProject", projectData)
        .then(res => {
            if (file) {
                file.append(
                    "type",
                    "Projeto"
                )
                file.append(
                    "id",
                    res.data._id
                )
                axios
                    .post("api/upload/file", file)
                    .then(history.push("/listProjects"));
            } else {
                history.push("/listProjects");
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

            if (file) {
                file.append(
                    "type",
                    "Submissao Projeto"
                )
                file.append(
                    "id",
                    res.data._id
                )
                axios
                    .post("api/upload/file", file, {
                        headers: {
                            "Content-type": "multipart/form-data"
                        }
                    })
                    .then(history.push("/listSubmitedProjectsCompany"));
            } else {
                history.push("/listSubmitedProjectsCompany");
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
            if (file) {
                file.append(
                    "type",
                    "Projeto"
                )
                file.append(
                    "id",
                    res.data._id
                )
                axios
                    .post("api/upload/file", file)
                    .then(history.push("/listProjects"))
            } else {
                history.push("/listProjects")
            }
        }).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};





