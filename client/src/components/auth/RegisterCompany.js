import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerCompany } from "../../actions/authActions";
import classnames from "classnames";

class RegisterCompany extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            password2: "",
            username: "",
            name: "",
            role: "Empresa",
            phone: "",
            address: "",
            birthDate: "",
            companyName: "",
            companyAddress: "",
            observations: "",
            authorization: "",
            errors: {}
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

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            name: this.state.name,
            role: this.state.role,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            phone: this.state.phone,
            address: this.state.address,
            birthDate: this.state.birthDate,
            companyAddress: this.state.companyAddress,
            companyName: this.state.companyName,
            observations: this.state.observations,
            authorization: true,
        };

        console.log(newUser);

        this.props.registerCompany(newUser, this.props.history);
    };

    reload() {
        window.location.reload();
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container" style={{marginTop: "5%"}}>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <a href="/" className="btn-flat waves-effect" onClick={this.reload()}>
                            <i className="material-icons left">keyboard_backspace</i>
                            Voltar
                        </a>

                        <div className="col s12" style={{ paddingLeft: "11.250px"}}>
                            <h4>
                                <b>Registe-se como Empresa </b>
                            </h4>
                            <p className="grey-text text-darken-1" style={{fontWeight:"bolder"}}>
                                Já tem conta? <Link to="/login">Log in</Link>
                            </p>
                            <p className="grey-text text-darken-1" style={{fontWeight:"bolder"}}>
                                Registe-se como Voluntário <Link to="/registerVoluntary">Registar</Link>
                            </p>
                        </div>

                        <form noValidate>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.username
                                    })}
                                />
                                <label htmlFor="name">Username *</label>
                                <span className="red-text">{errors.username}</span>
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
                                <label htmlFor="email">Email *</label>
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
                                <label htmlFor="password">Password *</label>
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
                                <label htmlFor="password2">Confirmar Password *</label>
                                <span className="red-text">{errors.password2}</span>
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
                                <label htmlFor="name">Nome Completo *</label>
                                <span className="red-text">{errors.name}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.phone}
                                    error={errors.phone}
                                    id="phone"
                                    type="number"
                                    className={classnames("", {
                                        invalid: errors.phone
                                    })}
                                />
                                <label htmlFor="number">Nº Telemóvel *</label>
                                <span className="red-text">{errors.phone}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.address}
                                    error={errors.address}
                                    id="address"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.address
                                    })}
                                />
                                <label htmlFor="name">Morada (Concelho)</label>
                                <span className="red-text">{errors.address}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.birthDate}
                                    error={errors.birthDate}
                                    id="birthDate"
                                    type="date"
                                    className={classnames("", {
                                        invalid: errors.birthDate
                                    })}
                                />
                                <label htmlFor="name">Data Nascimento *</label>
                                <span className="red-text">{errors.birthDate}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.companyName}
                                    error={errors.companyName}
                                    id="companyName"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.companyName
                                    })}
                                />
                                <label htmlFor="name">Nome Empresa *</label>
                                <span className="red-text">{errors.companyName}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.companyAddress}
                                    error={errors.companyAddress}
                                    id="companyAddress"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.companyAddress
                                    })}
                                />
                                <label htmlFor="name">Morada (Concelho) Empresa</label>
                                <span className="red-text">{errors.companyAddress}</span>
                            </div>
        
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.observations}
                                    error={errors.observations}
                                    id="observations"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.observations
                                    })}
                                />
                                <label htmlFor="name">Observações</label>
                                <span className="red-text">{errors.observations}</span>
                            </div>

                            <div className="input-field col s12">
                                <b>Autorização RGPD *</b>
                                <label>
                                    <br></br>
                                    <input type="checkbox" />
                                    <span>Consinto, ao abrigo do Regulamento Geral de Proteção de Dados (RGPD), a utilização dos meus dados pessoais, fornecidos no formulário, ficando informado/a do direito a retirar o consentimento a qualquer momento e que o tratamento de dados é da responsabilidade do IPS, sendo-lhe aplicada a Política de Proteção de Dados do IPS.</span>
                                    <br></br>
                                    <a href="http://www.si.ips.pt/ips_si/web_base.gera_pagina?P_pagina=40723" rel="noopener noreferrer" target="_blank">(Disponível aqui)</a>
                                </label>
                            </div>
                        </form>
                            <div className="col s12" style={{ paddingLeft: "11.250px", paddingBottom: "60px" }}>
                                <br></br><br></br><br></br><br></br><br></br>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: 10,
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    onClick={this.onSubmit}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                                    Registar
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

RegisterCompany.propTypes = {
    registerCompany: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerCompany }
)(withRouter(RegisterCompany));