import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import PushNotificationsToast from "../pushNotifications/PushNotificationToast.js"
import M from "materialize-css";
import options from "materialize-css";
import SideMenu from "./SideMenu.js";
import "../../componentsCSS/Navbar.css"

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: ""
        }
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    componentDidMount() {
        axios.get('/api/users/getUserDetails/' + this.props.auth.user.id)
            .then(response => {
                this.setState({
                    username: response.data[0].username,
                    email: response.data[0].email
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    render() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, options);
        });
        const { user } = this.props.auth;
        return (
            <div>
                {user.id !== undefined ? (
                    <nav className="nav" style={{
                        maxWidth: "100%",
                        top: 0,
                        backgroundColor: "#23395D",
                        zIndex: "10"
                    }}>
                        <div className="nav-wrapper">
                            <ul id="nav-mobile" className="right">
                                <li><PushNotificationsToast></PushNotificationsToast></li>
                                <li><SideMenu username={this.state.username} email={this.state.email} logout={this.onLogoutClick}></SideMenu></li>
                                <li><p data-target="slide-out" className="sidenav-trigger show-on-large right"><i className="material-icons">menu</i></p></li>
                                <li><a href="/dashboard"><img src={require('./images/logo.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="logo img-responsive"
                                    style={{ position: "absolute", left: 0, maxWidth: 200 }} /></a></li>
                            </ul>
                        </div>
                    </nav>
                ) : (
                        <nav className="nav" style={{
                            width: "100%",
                            top: 0,
                            backgroundColor: "#23395D",
                            zIndex: "10"
                        }}>
                            <div className="nav-wrapper">
                                <ul id="nav-mobile" className="right">
                                    <li><a href="/"><img src={require('./images/logo.png')}
                                        alt="(Não esquecer de verificar no spam)"
                                        className="logo img-responsive"
                                        style={{ position: "absolute", left: 0, maxWidth: 200 }} /></a></li>
                                    <li><a href="/login" style={{fontSize: 14}}><i className="material-icons left">person</i>Iniciar Sessão</a></li>
                                    <li><a href="/registerVoluntary" id="botao" className="green btn" style={{ width: 100, borderRadius: 10, marginBottom: 3, fontSize: 14 }}>Registar</a></li>
                                </ul>
                            </div>
                        </nav>
                    )}
            </div>
        );
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);
