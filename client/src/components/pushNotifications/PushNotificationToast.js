import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import pushTemplates from '../../models/pushNotificationTemplates';

//const templates=new pushTemplates();

const notify = () => {
    toast('Isto é uma Notificação', {position: "bottom-right"})
}

toast.configure()
export default class PushNotifications extends React.Component {



    render(){
        return(
            <button onClick={notify}> Notify!</button>
        );
    }

}