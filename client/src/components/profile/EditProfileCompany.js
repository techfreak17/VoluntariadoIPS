import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import options from "materialize-css";
import classnames from "classnames";

export default class EditProfileCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            phone: "",
            address: "",
            role: "",
            birthDate: "",
            password: "",
            password2: "",
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
        axios.all([
            axios.get('/api/users/getUserDetails/' + this.props.match.params.id),
            axios.get('/api/users/getUser/' + this.props.match.params.id)
        ])
            .then(responseArr => {
                var date = new Date(responseArr[0].data.birthDate);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var d = date.getDate();
                var mm = month < 10 ? '0' + month : month;
                var dd = d < 10 ? '0' + d : d;
                date = '' + year + "-" + mm + "-" + dd;
                this.setState({
                    name: responseArr[0].data.name,
                    phone: responseArr[0].data.phone,
                    address: responseArr[0].data.address,
                    birthDate: date,
                    role: responseArr[1].data.role,
                });
            })
            .catch(error => console.log(error));
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            role: this.state.role,
            birthDate: this.state.birthDate,
            password: this.state.password,
            password2: this.state.password2,
        };
        axios.post('/api/users/updateUser/' + this.props.match.params.id, obj)
        window.location.reload();
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
                        <h3>Editar Detalhes</h3>
                        <form noValidate>
                            <div className="input-field col s12">
                                <label htmlFor="name">Nome Completo</label><br></br>
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
                                <label htmlFor="number">Nº Telemóvel</label><br></br>
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
                                    onChange={e => this.setState({
                                        address: e.target.value,
                                        validationErrorAddress: e.target.value === "" ? "Deverá preencher o campo Morada (Concelho)" : ""
                                    })}
                                    value={this.state.address}
                                    id="address"
                                    type="text"
                                    error={errors.address}
                                    className={classnames("", {
                                        invalid: errors.address
                                    })}
                                />
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorAddress}
                                </div>
                                <span className="red-text">{errors.address}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="name">Data Nascimento</label><br></br>
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
                                <input
                                    onChange={e => this.setState({
                                        password2: e.target.value,
                                        validationErrorPassword: e.target.value === "" ? "Deverá preencher o campo Password Atual" : ""
                                    })}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                                <label htmlFor="password">Password Atual</label>
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorPassword}
                                </div>
                                <span className="red-text">{errors.password}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={e => this.setState({
                                        password2: e.target.value,
                                        validationErrorPassword2: e.target.value === "" ? "Deverá preencher o campo Password Nova" : ""
                                    })}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <label htmlFor="password2">Password Nova</label>
                                <div style={{ color: "red", marginTop: "5px" }}>
                                    {this.state.validationErrorPassword2}
                                </div>
                                <span className="red-text">{errors.password2}</span>
                            </div>
                        </form>
                        <div className="col s12" style={{ marginTop: "1%", paddingBottom: 60 }}>
                            <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, marginLeft: "20%" }}
                                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Editar
                            </button>
                            <a style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, backgroundColor: "red", marginRight: "20%" }}
                                href={"/baseProfile/" + this.props.match.params.id} className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
