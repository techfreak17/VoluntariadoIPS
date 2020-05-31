import axios from "axios";

// Create Project
export const getNotification = (userId, history) => dispatch => {
    axios
        .get("/api/Notifications/getNotification/"+userId);
};
