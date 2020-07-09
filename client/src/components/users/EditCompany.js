import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import options from "materialize-css";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUser } from "../../actions/userActions";
import Upload from "../upload/Upload";
import "../../componentsCSS/Forms.css"

class EditCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            phone: "",
            address: "",
            companyAddress: "",
            companyName: "",
            role: "",
            observations: "",
            username: "",
            birthDate: "",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (window.localStorage) {
            if (!localStorage.getItem('firstLoad')) {
                localStorage['firstLoad'] = true;
                window.location.reload();
            }
            else
                localStorage.removeItem('firstLoad');
        }

        axios.get('/api/users/getUserDetails/' + this.props.match.params.id)
            .then(response => {
                var date = new Date(response.data[1].birthDate);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var d = date.getDate();
                var mm = month < 10 ? '0' + month : month;
                var dd = d < 10 ? '0' + d : d;
                date = '' + year + "-" + mm + "-" + dd;
                this.setState({
                    name: response.data[1].name,
                    email: response.data[1].email,
                    phone: response.data[1].phone,
                    address: response.data[1].address,
                    companyAddress: response.data[1].companyAddress,
                    companyName: response.data[1].companyName,
                    birthDate: date,
                    observations: response.data[1].observations,
                    role: response.data[0].role,
                    username: response.data[0].username
                });
            })
            .catch(error => console.log(error));
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

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            companyAddress: this.state.companyAddress,
            companyName: this.state.companyName,
            role: this.state.role,
            observations: this.state.observations,
            username: this.state.username,
            birthDate: this.state.birthDate
        };

        this.props.editUser(this.props.match.params.id, obj, this.props.history);

    }

    goBack() {
        window.history.back();
    }

    render() {
        const { errors } = this.state;

        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems, options);
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <h3 align="left">Editar Detalhes</h3>
                        <p><b>Nota:</b> Todos os campos a * deverão ser preenchidos.</p>
                        <form noValidate>
                            <div className="input-field col s12">
                                <label htmlFor="name">Username *</label><br></br>
                                <input
                                    onChange={e => this.setState({
                                        username: e.target.value,
                                        validationErrorUsername: e.target.value === "" ? "Deverá preencher o campo Username" : ""
                                    })}
                                    value={this.state.username}
                                    id="username"
                                    type="text"
                                    error={errors.username}
                                    className={classnames("", {
                                        invalid: errors.username
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorUsername}
                                </div>
                                <span className="red-text">{errors.username}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="email">Email *</label><br></br>
                                <input
                                    onChange={e => this.setState({
                                        email: e.target.value,
                                        validationErrorEmail: e.target.value === "" ? "Deverá preencher o campo Email" : ""
                                    })}
                                    value={this.state.email}
                                    id="email"
                                    type="email"
                                    error={errors.email}
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorEmail}
                                </div>
                                <span className="red-text">{errors.email}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="name">Nome Completo *</label><br></br>
                                <input
                                    onChange={e => this.setState({
                                        name: e.target.value,
                                        validationErrorName: e.target.value === "" ? "Deverá preencher o campo Nome Completo" : ""
                                    })}
                                    value={this.state.name}
                                    id="name"
                                    type="text"
                                    error={errors.name}
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorName}
                                </div>
                                <span className="red-text">{errors.name}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="number">Nº Telemóvel *</label><br></br>
                                <input
                                    onChange={e => this.setState({
                                        phone: e.target.value,
                                        validationErrorPhone: e.target.value === "" ? "Deverá preencher o campo Nº Telemóvel" : ""
                                    })}
                                    value={this.state.phone}
                                    id="phone"
                                    type="number"
                                    error={errors.phone}
                                    className={classnames("", {
                                        invalid: errors.phone
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorPhone}
                                </div>
                                <span className="red-text">{errors.phone}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="name">Morada (Concelho)</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.address}
                                    id="address"
                                    type="text"
                                    error={errors.address}
                                    className={classnames("", {
                                        invalid: errors.address
                                    })}
                                />
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
                                    id="birthDate"
                                    type="date"
                                    error={errors.birthDate}
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
                                <label htmlFor="name">Nome Empresa *</label><br></br>
                                <input
                                    onChange={e => this.setState({
                                        companyName: e.target.value,
                                        validationErrorCompanyName: e.target.value === "" ? "Deverá preencher o campo Nome Empresa" : ""
                                    })}
                                    value={this.state.companyName}
                                    id="companyName"
                                    type="text"
                                    error={errors.companyName}
                                    className={classnames("", {
                                        invalid: errors.companyName
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorCompanyName}
                                </div>
                                <span className="red-text">{errors.companyName}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="name">Morada (Concelho) Empresa *</label><br></br>
                                <input
                                    onChange={e => this.setState({
                                        companyAddress: e.target.value,
                                        validationErrorCompanyAddress: e.target.value === "" ? "Deverá preencher o campo Morada (Concelho) Empresa" : ""
                                    })}
                                    value={this.state.companyAddress}
                                    id="companyAddress"
                                    type="text"
                                    error={errors.companyAddress}
                                    className={classnames("", {
                                        invalid: errors.companyAddress
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorCompanyAddress}
                                </div>
                                <span className="red-text">{errors.companyAddress}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="name">Observações</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.observations}
                                    id="observations"
                                    type="text"
                                    error={errors.observations}
                                    className={classnames("", {
                                        invalid: errors.observations
                                    })}
                                />
                                <span className="red-text">{errors.observations}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="name">Logótipo</label><br></br><br></br>
                                <Upload type="Utilizador" id={this.props.match.params.id}></Upload>
                            </div>

                        </form>
                        <div className="botoes col s12" style={{ marginTop: "auto", marginBottom: "10%", display: "flex", justifyContent: "space-around"}}>
                            <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5}}
                                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Submeter
                            </button>
                            <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, backgroundColor: "red"}}
                                onClick={this.goBack} className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditCompany.propTypes = {
    editUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { editUser }
)(EditCompany);