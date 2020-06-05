import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import options from "materialize-css";
import classnames from "classnames";

export default class EditVoluntary extends Component {
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
        this.handleChangeInterestAreas = this.handleChangeInterestAreas.bind(this);
        this.handleChangeReasons = this.handleChangeReasons.bind(this);
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
                var month = date.getMonth();
                var d = date.getDate();
                var mm = month < 10 ? '0' + month : month;
                var dd = d < 10 ? '0' + d : d;
                date = '' + year + "-" + mm + "-" + dd;
                this.setState({
                    name: responseArr[0].data.name,
                    email: responseArr[0].data.email,
                    phone: responseArr[0].data.phone,
                    address: responseArr[0].data.address,
                    companyAddress: responseArr[0].data.companyAddress,
                    companyName: responseArr[0].data.companyName,
                    birthDate: date,
                    observations: responseArr[0].data.observations,
                    role: responseArr[1].data.role,
                    username: responseArr[1].data.username
                });
            })
            .catch(error => console.log(error));
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleChangeInterestAreas(event) {
        this.setState({ interestAreas: Array.from(event.target.selectedOptions, (item) => item.value) });
    }

    handleChangeReasons(event) {
        this.setState({ reasons: Array.from(event.target.selectedOptions, (item) => item.value) });
    }

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
        axios.post('/api/admin/updateUser/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        this.props.history.push('/listUsers');
        window.location.reload();
    }

    render() {
        const { errors } = this.state;

        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems, options);
            console.log(instances);
        });

        return (
            <div className="container" style={{ marginTop: "5%" }}>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <a href="/listUsers" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                    Voltar
                </a>

                        <form noValidate>
                            <div className="input-field col s12">
                                <label htmlFor="name">Username</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    id="username"
                                    type="text"
                                    error={errors.username}
                                    className={classnames("", {
                                        invalid: errors.username
                                    })}
                                />
                                <span className="red-text">{errors.username}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="email">Email</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    id="email"
                                    type="email"
                                    error={errors.email}
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <span className="red-text">{errors.email}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="name">Nome Completo</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    id="name"
                                    type="text"
                                    error={errors.name}
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <span className="red-text">{errors.name}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="number">Nº Telemóvel</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.phone}
                                    id="phone"
                                    type="number"
                                    error={errors.phone}
                                    className={classnames("", {
                                        invalid: errors.phone
                                    })}
                                />
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
                                <label htmlFor="name">Data Nascimento</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.birthDate}
                                    id="birthDate"
                                    type="date"
                                    error={errors.birthDate}
                                    className={classnames("", {
                                        invalid: errors.birthDate
                                    })}
                                />
                                <span className="red-text">{errors.birthDate}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="name">Nome Empresa</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.companyName}
                                    id="companyName"
                                    type="text"
                                    error={errors.companyName}
                                    className={classnames("", {
                                        invalid: errors.companyName
                                    })}
                                />
                                <span className="red-text">{errors.companyName}</span>
                            </div>

                            <div className="input-field col s12">
                                <label htmlFor="name">Morada (Concelho) Empresa</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.companyAddress}
                                    id="companyAddress"
                                    type="text"
                                    error={errors.companyAddress}
                                    className={classnames("", {
                                        invalid: errors.companyAddress
                                    })}
                                />
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

                        </form>
                        <div className="col s12" style={{ paddingLeft: "11.250px", paddingBottom: "60px" }}>
                            <br></br>
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
                                Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
