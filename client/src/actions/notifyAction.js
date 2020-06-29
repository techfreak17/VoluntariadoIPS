import axios from "axios";

// Get Notification
export const getNotification = (userId, history) => dispatch => {
    axios
        .get("/api/Notifications/getNotification/"+userId);
};

// Create Notification
export const createNotification = (notifData, history) => dispatch => {
    axios
        .post("/api/notifications/createNotification", notifData)
        .then(res => history.push("/listNotifications")) 
        
};