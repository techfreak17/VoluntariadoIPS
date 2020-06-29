import axios from "axios";

import {
    GET_ERRORS
} from "./types";

// Create Project
export const createProject = (projectData, file, history) => dispatch => {
    axios
        .post("/api/projects/createProject", projectData)
        .then(res => {
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
                .then(history.push("/listProjects"))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Create Project
export const submitProject = (projectData, history) => dispatch => {
    axios
        .post("/api/submitedProjects/submitCreateProject", projectData)
        .then(res => history.push("/listSubmitedProjects")
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};




