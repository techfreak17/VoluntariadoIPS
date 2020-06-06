import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Menu extends Component {
    render() {
        const user = this.props.auth.isAuthenticated;

        return (
            <div className="container">
                {user ? (
                    <nav className="nav" style={{
                        width: "67.27%",
                        position: "fixed",
                        bottom: 0,
                        backgroundColor: "#23395D",
                        zIndex: "10"
                    }}>
                        <div className="nav-wrapper">
                            <ul id="nav-mobile" className="left">
                                <li><a href="/dashboard"><i className="material-icons">home</i></a></li>
                                <li><a href="/listProjects">Projetos</a></li>
                                {(() => {
                                    if (this.props.auth.user.role === "Administrador") {
                                        return (
                                            <li><a href="/listSubmitedProjects">Propostas</a></li>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (this.props.auth.user.role === "Administrador") {
                                        return (
                                            <li><a href="/listUsers">Utilizadores</a></li>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (this.props.auth.user.role === "Voluntário") {
                                        return (
                                            <li><a href="/listProjectsVoluntary">Meus Projetos</a></li>
                                        )
                                    }
                                })()}
                                <li><a href="..."> </a></li>
                            </ul>
                        </div>
                    </nav>
                ) : (
                        ""
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