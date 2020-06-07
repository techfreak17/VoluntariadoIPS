import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import React, { Component } from "react";

const Container = styled.div `
    background-color: #444;
    color: white;
    padding: 1px;
    position: fixed;
    top: ${props => props.top}px;
    right: 5px;
    z-index: 999;
    transition: top 0.2s ease;
    margin-top: 57px;


`;

export default class PushNotifications extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            top: -300,
        };
        this.timeout = null;
    }


    onShow = () => {
        if(this.timeout){
            clearTimeout(this.timeout);
            this.setState({top: -300}, () =>{
                this.timeout = setTimeout(() => {
                    this.showNotification();
                }, 200);
            });
        } else{
            this.showNotification();
        }
    }

    showNotification = () => {
        this.setState({
            top: 8,
        }, () => {
            this.timeout = setTimeout(() => {
                this.setState({
                    top: 15,
                });
            })
        }, 3000);
    } 

    render(){
        return(
            <React.Fragment>
                <button onClick={this.onShow}>Notif</button>
                {/* <button onClick={this.showNotification}>Click to Notif</button> */}
                <Container top={this.state.top}>Isto é um exemplo de Notificação </Container>
            </React.Fragment>
        );
    }

}

//export default PushNotifications;