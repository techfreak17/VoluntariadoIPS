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
                                <p className="flow-text text-darken-1" style={{ fontFamily: "monospace" }}>Esta é a tua página principal, Bem-vindo 👏</p>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid" style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 700,
                        zIndex: -1
                    }}>
                        <img src={require("../layout/images/background1.jpg")} alt="Unsplashed background img 1" style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>


                <div className="container">
                    <div className="section">
                        <div className="row">

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="medium material-icons">flash_on</i></h2>
                                    <h5 className="center">Speeds up development</h5>
                                    <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="medium material-icons">group</i></h2>
                                    <h5 className="center">User Experience Focused</h5>
                                    <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="medium material-icons">settings</i></h2>
                                    <h5 className="center">Easy to work with</h5>
                                    <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                                </div>
                            </div>
                        </div>
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