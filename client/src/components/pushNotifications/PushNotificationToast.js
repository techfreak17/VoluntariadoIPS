import React, { Component } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from "axios";
//import pushTemplates from '../../models/pushNotificationTemplates';





   // const notify = (msg) => {
        //toast(msg, {position: "bottom-right"})
   // }


toast.configure()
export default class PushNotifications extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            msgs: [],
            position: 0
        };
    }

    componentDidMount(){
        Axios.get('/api/users/listUsers')
          .then(response => {
            this.setState({ msgs: response.data});
          })
          .catch(function (error) {
            console.log(error);
          })
      }

    notify = () => {
        if(this.state.msgs[this.state.position]){
            toast(this.state.msgs[this.state.position], {position: "bottom-right"});
            this.state.position++;
        }else{
            toast('Não existem notificações', {position: "bottom-right"});
        }
    }
    
   
    render(){
        return(
            <button onClick={this.notify}> Notify!</button>
        );
    }

}