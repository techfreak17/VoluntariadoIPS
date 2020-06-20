import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";


toast.configure()
class PushNotificationToast extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {},
            msgs: [],
            readMsgs: [],
            position: 0,
            readPos: 0
        };
    }

    componentDidMount() {
        axios.get('/api/notifications/listNotifications/' + this.props.auth.user.id)
            .then(response => {
                this.setState({ msgs: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('/api/notifications/listReadNotifications/' + this.props.auth.user.id)
            .then(response => {
                this.setState({ readMsgs: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    markRead(notif) {
        axios.get('/api/notifications/updateNotification/' + notif._id)
            .catch(function (error) {
                console.log(error);
            });
    }

    notify = () => {
        const notif = this.state.msgs[this.state.position];
        if (notif) {
            let myDate = new Date(notif.date);
            myDate = myDate.toLocaleString();
            toast(notif.body + " (" + myDate + ")", { position: "bottom-right", onClose: () => this.markRead(notif) });
            this.setState({
                position: this.state.position + 1,
            });
        } else {
            toast('Não existem mais notificações', { position: "bottom-right" });
            this.setState({ position: 0 });
        }
    }

    notifyRead = () => {
        const notif = this.state.readMsgs[this.state.readPos];
        if (notif) {
            let myDate = new Date(notif.date);
            myDate = myDate.toLocaleString();
            toast(notif.body + " (" + myDate + ")", { position: "bottom-right" });
            this.setState({ readPos: this.state.readPos + 1 });
        } else {
            toast('Não existem mais notificações', { position: "bottom-right" });
            this.setState({ readPos: 0 });
        }
    }


    render() {
        return (
            <ul id="nav-mobile" className="right" >
                {(() => {
                    if (this.state.msgs.length === 0) {
                        return (
                            <li><button onClick={this.notify} style={{ backgroundColor: "transparent", color: "white", border: "none" }}><i className="material-icons">email</i></button></li>
                        )
                    }else{
                        return (
                            <li><button onClick={this.notify} style={{ backgroundColor: "transparent", color: "red", border: "none" }}><i className="material-icons">email</i></button></li>
                        )
                    }
                })()}
                <li><button onClick={this.notifyRead} style={{ backgroundColor: "transparent", color: "white", border: "none" }}><i className="material-icons">drafts</i></button></li>
                <ToastContainer autoClose={10000} style={{ width: "auto" }} />
            </ul>
        );
    }



}

PushNotificationToast.propTypes = {

    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps

)(PushNotificationToast);
