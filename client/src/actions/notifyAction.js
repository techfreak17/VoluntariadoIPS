import axios from "axios";

// Create Project
export const getNotification = (userId, history) => dispatch => {
    axios
        .get("/api/Notifications/getNotification/"+userId);
};

export const createNotification = (notifData, history) => dispatch => {
    axios
        .post("/api/notifications/createNotification", notifData)
        .then(res => history.push("/listNotifications")) 
        
};