import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {

        const { user } = this.props.auth;

        return (

            <div className="container-fluid" style={{ width: "100%" }}>
                <div className="parallax-container valign-wrapper" style={{ width: "100%", minHeight: 380, lineHeight: 0, color: "white", height: 400, position: "relative", overflow: "hidden" }}>
                    <div className="section no-pad-bot" style={{ width: "100%" }}>
                        <div className="container">
                            <h1 className="header center teal-text text-lighten-2">Bem-vindo à plataforma {" "}
                                <span style={{ fontFamily: "monospace" }}>VoluntariadoIPS</span></h1>
                            <div className="row center" style={{ width: "50%" }}>
                                <h5 className="header col s12 light"><b>Olá</b> {user.name.split(" ")[0]},
                                <p className="flow-text text-darken-1" style={{fontFamily: "monospace" }}>Esta é a tua página principal, Bem-vindo 👏</p>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{
                        position: "absolute",
                        top: -100,
                        left: 900,
                        zIndex: -1,
                        transform: "translate(-50%)"
                    }}>
                        <img src={require("../layout/images/background1.jpg")} alt="Unsplashed background img 1" />
                    </div>
                </div>
            </div>



        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);