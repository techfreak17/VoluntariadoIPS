import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCompany } from "../../actions/createActions";
import classnames from "classnames";
import Upload from "../upload/Upload";
import "../../componentsCSS/Forms.css"

class CreateCompanyUser extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            password2: "",
            username: "",
            role: "Empresa",
            name: "",
            phone: "",
            address: "",
            birthDate: "",
            companyName: "",
            companyAddress: "",
            observations: "",
            authorization: true,
            listProjects: [],
            isVerified: true,
            errors: {},
            fileFormData: null,
        };
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

    handleUpload = (formData) => {
        this.setState({ fileFormData: formData });
    }

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
            authorization: this.state.authorization,
            listProjects: this.state.listProjects,
            isVerified: this.state.isVerified
        };

        this.props.createCompany(newUser, this.state.fileFormData, this.props.history);
    };

    goBack() {
        window.history.back();
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h3>Criar Empresa</h3>
                            <p><b>Nota:</b> Todos os campos a * deverão ser preenchidos.</p>
                        </div>
                        <form noValidate>
                            <div className="input-field col s12">
                                <input
                                    onChange={e => this.setState({
                                        username: e.target.value,
                                        validationErrorUsername: e.target.value === "" ? "Deverá preencher o campo Username" : ""
                                    })}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.username
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorUsername}
                                </div>
                                <label htmlFor="name">Username *</label>
                                <span className="red-text">{errors.username}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={e => this.setState({
                                        email: e.target.value,
                                        validationErrorEmail: e.target.value === "" ? "Deverá preencher o campo Email" : ""
                                    })}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorEmail}
                                </div>
                                <label htmlFor="email">Email *</label>
                                <span className="red-text">{errors.email}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={e => this.setState({
                                        password: e.target.value,
                                        validationPassword: e.target.value === "" ? "Deverá preencher o campo Password" : ""
                                    })}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationPassword}
                                </div>
                                <label htmlFor="password">Password *</label>
                                <span className="red-text">{errors.password}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={e => this.setState({
                                        password2: e.target.value,
                                        validationPassword2: e.target.value === "" ? "Deverá preencher o campo Confirmar Password" : ""
                                    })}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationPassword2}
                                </div>
                                <label htmlFor="password2">Confirmar Password *</label>
                                <span className="red-text">{errors.password2}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={e => this.setState({
                                        name: e.target.value,
                                        validationErrorName: e.target.value === "" ? "Deverá preencher o campo Nome Completo" : ""
                                    })}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorName}
                                </div>
                                <label htmlFor="name">Nome Completo *</label>
                                <span className="red-text">{errors.name}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={e => this.setState({
                                        phone: e.target.value,
                                        validationErrorPhone: e.target.value === "" ? "Deverá preencher o campo Nº Telemóvel" : ""
                                    })}
                                    value={this.state.phone}
                                    error={errors.phone}
                                    id="phone"
                                    type="number"
                                    className={classnames("", {
                                        invalid: errors.phone
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorPhone}
                                </div>
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
                                <label htmlFor="name">Data Nascimento *</label><br></br>
                                <input
                                    onChange={e => this.setState({
                                        birthDate: e.target.value,
                                        validationErrorBirthDate: e.target.value === "" ? "Deverá preencher o campo Data Nascimento" : ""
                                    })}
                                    value={this.state.birthDate}
                                    error={errors.birthDate}
                                    id="birthDate"
                                    type="date"
                                    className={classnames("", {
                                        invalid: errors.birthDate
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorBirthDate}
                                </div>
                                <span className="red-text">{errors.birthDate}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={e => this.setState({
                                        companyName: e.target.value,
                                        validationErrorCompanyName: e.target.value === "" ? "Deverá preencher o campo Nome Empresa" : ""
                                    })}
                                    value={this.state.companyName}
                                    error={errors.companyName}
                                    id="companyName"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.companyName
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorCompanyName}
                                </div>
                                <label htmlFor="name">Nome Empresa *</label>
                                <span className="red-text">{errors.companyName}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={e => this.setState({
                                        companyAddress: e.target.value,
                                        validationErrorCompanyAddress: e.target.value === "" ? "Deverá preencher o campo Morada (Concelho) Empresa" : ""
                                    })}
                                    value={this.state.companyAddress}
                                    error={errors.companyAddress}
                                    id="companyAddress"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.companyAddress
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorCompanyAddress}
                                </div>
                                <label htmlFor="name">Morada (Concelho) Empresa *</label>
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
                                <label htmlFor="name">Logótipo</label><br></br><br></br>
                                <Upload handleUpload={this.handleUpload}></Upload>
                            </div>

                        </form>
                        <div className="botoes col s12" style={{ marginTop: "auto", marginBottom: 70, display: "flex", justifyContent: "space-around"}}>
                            <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5}}
                                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Submeter
                            </button>
                            <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, backgroundColor: "red"}}
                                onClick={this.goBack} className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateCompanyUser.propTypes = {
    createCompany: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createCompany }
)(withRouter(CreateCompanyUser));