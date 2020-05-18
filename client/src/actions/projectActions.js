import axios from "axios";

// Create Project
export const createProject = (projectData, history) => dispatch => {
    axios
        .post("/api/projects/create", projectData)
        .then(res => history.push("/projects")
        );
};
