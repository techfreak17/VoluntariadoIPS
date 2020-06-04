import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import pushTemplates from '../../models/pushNotificationTemplates';
import { createNotification } from "../../actions/notifyAction";





    const notify = (msg) => {
        toast(msg, {position: "bottom-right"})
    }

//const notify = () => {
   // toast('Isto é uma Notificação', {position: "bottom-right"})
//}

toast.configure()
export default class PushNotifications extends React.Component {

   
    render(){
        return(
            <button onClick={notify('NOTIFICATION')}> Notify!</button>
        );
    }

}