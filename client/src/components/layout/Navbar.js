import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PushNotifications from "../pushNotifications/PushNotifications.js";


class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
 


    render() {
        const { user } = this.props.auth;

        return (
            <nav className="nav" style={{
                width: "100%",
                position: "fixed",
                top: 0,
                backgroundColor: "#23395D",
                zIndex: "10"
            }}>
                <div className="nav-wrapper">
                    <ul id="nav-mobile" className="right">
                        <li><a className="navbar-brand" href="/dashboard"><img src={require('./images/logo.png')}
                            alt="(Não esquecer de verificar no spam)"
                            className="img-responsive"
                            style={{ position: "fixed", left: 0, height: "auto", width: "auto", maxWidth: 200}} /></a></li>
                        <li><PushNotifications></PushNotifications></li>
                        <li><a href="/listUsers"><i className="material-icons left">person</i>User</a></li>
                        <li><button onClick={this.onLogoutClick} className="red btn" style={{ borderRadius: 10 }}>Sair</button></li>
                    </ul>
                </div>
            </nav>
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




//<li><PushNotifications><i className="material-icons">notifications</i></PushNotifications></li>