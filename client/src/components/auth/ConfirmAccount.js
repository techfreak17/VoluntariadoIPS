import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class ConfirmAccount extends Component {
    constructor() {
        super();
        this.state = {
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
            window.location.reload();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        return (
            <div className="container" style={{marginTop: "5%"}}>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <a href="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Voltar
                        </a>

                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                Agora já estás registado na plataforma, deverás receber um email em breve!
                            </h4>
                        </div>

                        <div className="col s12">
                            <h5>
                                <p className="grey-text text-darken-1">
                                    Verifica a tua caixa de correio e segue o link para confirmares a tua conta.
                                </p>
                            </h5>
                        </div>

                        <div className="col s12" style={{ textAlign: "center" }}>
                            <img src={require('../layout/images/verified-blue.png')}
                                alt="(Não esquecer de verificar no spam)"
                                className="img-responsive"
                                style={{ borderRadius: '60%', width: '60%', }}
                            />
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

ConfirmAccount.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(ConfirmAccount));