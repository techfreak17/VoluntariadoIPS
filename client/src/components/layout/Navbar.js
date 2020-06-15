import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import PushNotificationsToast from "../pushNotifications/PushNotificationToast.js"
import M from "materialize-css";
import options from "materialize-css";

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email:"",
            id: this.props.auth.user.id
        }
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };



    componentDidMount() {
        axios.get('/api/users/getUser/' + this.state.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    email: response.data.email
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
                            <ul id="slide-out" className="sidenav">
                                <li><div className="user-view">
                                    <div className="background">
                                        <img src={require('./images/Voluntariado.png')}
                                         alt="(Não esquecer de verificar no spam)"
                                         className="img-responsive" />
                                    </div>
                                    <p><img className="circle" alt="(Não esquecer de verificar no spam)" src={require('./images/avatar.jpg')} /></p>
                                    <p><span className="white-text name">{this.state.username}</span></p>
                                    <p><span className="white-text email">{this.state.email}</span></p>
                                </div></li>
                                <li><a href={"/baseProfile/" + this.state.id}><i className="material-icons left">person</i>Perfil</a></li>
                                <li><a href={"/baseProfile/" + this.state.id}><i className="material-icons left">collections</i>Estatísticas</a></li>
                                <li><button onClick={this.onLogoutClick} className="blue btn" style={{ borderRadius: 10, marginLeft: 12, marginBottom: 5 }}>Sair</button></li>
                            </ul>
                            <p data-target="slide-out" className="sidenav-trigger show-on-large right"><i className="material-icons">menu</i></p>
                            <PushNotificationsToast></PushNotificationsToast>
                            <li><a className="navbar-brand" href="/dashboard"><img src={require('./images/logo.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive"
                                    style={{ position: "absolute", left: 0, height: "auto", width: "auto", maxWidth: 200 }} /></a></li>
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
                                    <li><a className="navbar-brand" href="/"><img src={require('./images/logo.png')}
                                        alt="(Não esquecer de verificar no spam)"
                                        className="img-responsive"
                                        style={{ position: "absolute", left: 0, height: "auto", width: "auto", maxWidth: 200 }} /></a></li>
                                    <li><a href="/login"><i className="material-icons left">person</i>Iniciar Sessão</a></li>
                                    <li><a href="/registerVoluntary" className="green btn" style={{ borderRadius: 10, marginBottom: 3 }}>Registar</a></li>
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
