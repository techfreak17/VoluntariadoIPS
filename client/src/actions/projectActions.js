import axios from "axios";

import {
    GET_ERRORS
} from "./types";

// Create Project
export const createProject = (projectData, history) => dispatch => {
    axios
        .post("/api/projects/createProject", projectData)
        .then(res => history.push("/listProjects")
        ).catch(err =>
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

// Create Project
export const editProject = (projectID,projectData, history) => dispatch => {
    axios
        .post("/api/projects/updateProject/"+ projectID, projectData)
        .then(res => history.push("/listProjects")
        ).catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};




