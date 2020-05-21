import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createUser } from "../../actions/userActions";
import classnames from "classnames";

class CreateUser extends Component {
    constructor() {
        super();
        this.state = {
            number: "",
            name: "",
            role: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            number: this.state.number,
            name: this.state.name,
            role: this.state.role,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.createUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div style={{ height: "75vh", marginTop: "5%" }} className="container">
                <h3 align="left">Criar Utilizador</h3>

                <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.number}
                            error={errors.number}
                            id="number"
                            type="number"
                            className={classnames("", {
                                invalid: errors.number
                            })}
                        />
                        <label htmlFor="number">Número</label>
                        <span className="red-text">{errors.number}</span>
                    </div>

                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id="name"
                            type="text"
                            className={classnames("", {
                                invalid: errors.name
                            })}
                        />
                        <label htmlFor="name">Nome</label>
                        <span className="red-text">{errors.name}</span>
                    </div>

                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            className={classnames("", {
                                invalid: errors.email
                            })}
                        />
                        <label htmlFor="email">Email</label>
                        <span className="red-text">{errors.email}</span>
                    </div>

                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password
                            })}
                        />
                        <label htmlFor="password">Password</label>
                        <span className="red-text">{errors.password}</span>
                    </div>

                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                        />
                        <label htmlFor="password2">Confirmar Password</label>
                        <span className="red-text">{errors.password2}</span>
                    </div>

                    <div className="input-field col s12">
                        <select onChange={this.onChange}
                            value={this.state.role}
                            error={errors.role}
                            id="role"
                            type="text"
                            className="browser-default">

                            <option value="" disabled selected>Selecionar Role</option>
                            <option value="Voluntário">Voluntário</option>
                            <option value="Empresa">Empresa</option>
                        </select>
                        <span className="red-text">{errors.role}</span>
                    </div>

                    <div className="col s12 center-align row">
                        <div className="col s6">
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    backgroundColor: "green"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable accent-3">
                                Criar
                            </button>
                        </div>
                        <div className="col s6">
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    backgroundColor: "red"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable accent-3">
                                <Link to="/listUsers" style={{ color: "white" }}>Cancelar</Link>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

CreateUser.propTypes = {
    createUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createUser }
)(CreateUser);