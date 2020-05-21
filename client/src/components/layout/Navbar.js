import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        return (
            <nav className="nav" style={{
                width: "100%",
                position: "fixed",
                top: 0,
                backgroundColor: "#23395D"
            }}>
                <div className="nav-wrapper">
                    <ul id="nav-mobile" className="right">
                        <li><a href="/dashboard"><img src={require('./images/logo.png')}
                            alt="(Não esquecer de verificar no spam)"
                            className="img-responsive"
                            style={{ position: "fixed", left: 0, width: "10.4%" }} /></a></li>
                        <li><a href="/listNotifications"><i className="material-icons">notifications</i></a></li>
                        <li><a href="/listUsers"><i className="material-icons left">person</i>Utilizador</a></li>
                        <li><button onClick={this.onLogoutClick} className="red btn" style={{borderRadius: 10}}>Sair</button></li>
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