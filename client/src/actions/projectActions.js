import axios from "axios";

// Create Project
export const createProject = (projectData, history) => dispatch => {
    axios
        .post("/api/projects/createProject", projectData)
        .then(res => history.push("/listProjects")
        );
};

// Create Project
export const submitProject = (projectData, history) => dispatch => {
    axios
        .post("/api/submitedProjects/submitCreateProject", projectData)
        .then(res => history.push("/listSubmitedProjects")
        );
};




