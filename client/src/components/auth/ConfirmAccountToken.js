import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmToken } from "../../actions/authActions";

class ConfirmAccountToken extends Component {
    constructor() {
        super();
        this.state = {
            token: null,
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
            window.location.reload();
        }
        const { token } = this.props.match.params
        this.setState(() => token)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const myToken = {
            token: this.props.match.params
        };

        this.props.confirmToken(myToken, this.props.history);
    };

    render() {
        return (
            <div className="container" style={{marginTop: "5%"}} >
                <div className="row">
                    <div className="col s8 offset-s2">

                        <a href="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Voltar
                        </a>

                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                Conclua o processo ao clicar em confirmar.
                             </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="col s12">
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                    Confirmar
                        </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }
}

ConfirmAccountToken.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { confirmToken }
)(withRouter(ConfirmAccountToken));