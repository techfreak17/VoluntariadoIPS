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
        const { user } = this.props.auth;
        return (
            <div>
                {user.name !== undefined ? (
                    <nav className="nav" style={{
                        maxWidth: "100%",
                        top: 0,
                        backgroundColor: "#23395D",
                        zIndex: "10"
                    }}>
                        <div className="nav-wrapper">
                            <ul id="nav-mobile" className="right">
                                <li><a className="navbar-brand" href="/dashboard"><img src={require('./images/logo.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive"
                                    style={{ position: "absolute", left: 0, height: "auto", width: "auto", maxWidth: 200 }} /></a></li>
                                <li><a href="/listNotifications"><i className="material-icons">notifications</i></a></li>

                                <li><a href="/listUsers"><i className="material-icons left">person</i>{user.name}</a></li>
                                <li><button onClick={this.onLogoutClick} className="red btn" style={{borderRadius: 10, marginLeft: 12, marginBottom: 5 }}>Sair</button></li>
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
                                    <li><a className="navbar-brand" href="/"><img src={require('./images/logo.png')}
                                        alt="(Não esquecer de verificar no spam)"
                                        className="img-responsive"
                                        style={{ position: "absolute", left: 0, height: "auto", width: "auto", maxWidth: 200 }} /></a></li>
                                    <li><a href="/login"><i className="material-icons left">person</i>Iniciar Sessão</a></li>
                                    <li><a href="/register" className="green btn" style={{ borderRadius: 10, marginBottom: 3 }}>Registar</a></li>
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