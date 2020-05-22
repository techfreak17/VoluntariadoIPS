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
            <div style={{height: "75vh"}} className="container valign-wrapper"> 
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Olá</b> {user.name.split(" ")[0]},
                            <p className="flow-text grey-text text-darken-1">
                                Esta é a tua página principal,{" "}
                                <span style={{ fontFamily: "monospace" }}>Bem-vindo</span> 👏
                            </p>
                            <b>Bem-Vindo,</b> {user.name}
                        </h4>
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