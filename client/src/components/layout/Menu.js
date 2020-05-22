import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Menu extends Component {
    render() {
        const user  = this.props.auth.isAuthenticated;

        return (
            <div className="container ">
                {user ? (
                <nav className="nav" style={{
                    width: "70%",
                    position: "fixed",
                    bottom: 0,
                    backgroundColor: "#23395D",
                    zIndex: "10"
                }}>
                    <div className="nav-wrapper">
                        <ul id="nav-mobile" className="left">
                            <li><a href="/dashboard"><i className="material-icons">home</i></a></li>
                            <li><a href="/listProjects">Projetos</a></li>
                            <li><a href="/listUsers">Utilizadores</a></li>
                            <li><a href="..."> </a></li>
                        </ul>
                    </div>
                </nav>
                ) : ( 
                    <p>Olá</p>
                )}
            </div>
        );
    }
}

Menu.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Menu);