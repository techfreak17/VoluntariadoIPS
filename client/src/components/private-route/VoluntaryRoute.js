import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const VoluntaryRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => (auth.isAuthenticated === true && auth.user.role === "Voluntário") ?
                    <Component {...props} /> :
                    <Redirect to="/Dashboard" />
        }
    />
);

VoluntaryRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(VoluntaryRoute);