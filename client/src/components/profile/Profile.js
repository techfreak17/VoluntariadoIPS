import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            address: "",
            member: "",
            school: "",
            course: "",
            birthDate: "",
            companyAddress: "",
            companyName: "",
            role: "",
            interestAreas: "",
            errors: {}
        };
    }

    componentDidMount() {
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
                    member: response.data[1].memberIPS,
                    school: response.data[1].schoolIPS,
                    course: response.data[1].courseIPS,
                    companyAddress: response.data[1].companyAddress,
                    companyName: response.data[1].companyName,
                    interestAreas: response.data[1].interestAreas,
                    birthDate: date,
                    role: this.props.auth.user.role
                });
            });
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
            <div style={{ paddingBottom: 50 }}>
                <div className='container'>
                    <div className='row'>
                        <div className='col s5 center'>
                            <div>
                                <a className="" href="/dashboard"><img src={require('../layout/images/avatar.jpg')}
                                    alt="Avatar"
                                    className="img-responsive"
                                    style={{ position: "relative", height: "auto", width: "250px", paddingTop: '20%', borderRadius: '50%' }} />
                                </a>
                                <h4>{this.state.name}</h4>
                                <h4 style={{ fontWeight: "bold" }}>{this.state.role}</h4>
                                {(() => {
                                    if (this.props.auth.user.role === "Voluntário") {
                                        return (
                                            <Link to={"/editProfileVoluntary/" + this.props.match.params.id} className="btn waves-effect waves-light hoverable" style={{ backgroundColor: "#23395D", color: "white", height: 35 }}>Editar Perfil</Link>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (this.props.auth.user.role === "Empresa") {
                                        return (
                                            <Link to={"/editProfileCompany/" + this.props.match.params.id} className="btn waves-effect waves-light hoverable" style={{ backgroundColor: "#23395D", color: "white", height: 35 }}>Editar Perfil</Link>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (this.props.auth.user.role === "Administrador") {
                                        return (
                                            <Link to={"/editProfileAdmin/" + this.props.match.params.id} className="btn waves-effect waves-light hoverable" style={{ backgroundColor: "#23395D", color: "white", height: 35 }}>Editar Perfil</Link>
                                        )
                                    }
                                })()}

                            </div>
                        </div>
                        {(() => {
                            if (this.props.auth.user.role === "Voluntário") {
                                return (
                                    <div className='col s7' style={{ marginTop: 20 }}>
                                        <h5 style={{ fontWeight: 'bold' }}>Nome Completo</h5>
                                        <input readOnly value={this.state.name}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Email</h5>
                                        <input readOnly value={this.state.email}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Telemóvel</h5>
                                        <input readOnly value={this.state.phone}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Data Nascimento</h5>
                                        <input readOnly type="date" value={this.state.birthDate} />
                                        <h5 style={{ fontWeight: 'bold' }}>Escola</h5>
                                        <input readOnly value={this.state.school}></input>
                                        {(() => {
                                            if (this.state.course !== "" && this.state.address !== "") {
                                                return (
                                                    <div>
                                                        <h5 style={{ fontWeight: 'bold' }}>Curso</h5>
                                                        <input readOnly value={this.state.course}></input>
                                                        <h5 style={{ fontWeight: 'bold' }}>Morada (Concelho)</h5>
                                                        <input readOnly value={this.state.address}></input>
                                                    </div>
                                                )
                                            }
                                        })()}
                                        <h5 style={{ fontWeight: 'bold' }}>Áreas de Interesse</h5>
                                        <input readOnly value={this.state.interestAreas}></input>
                                    </div>
                                )
                            }
                        })()}
                        {(() => {
                            if (this.props.auth.user.role === "Empresa") {
                                return (
                                    <div className='col s7' style={{ marginTop: 20 }}>
                                        <h5 style={{ fontWeight: 'bold' }}>Nome Completo</h5>
                                        <input readOnly value={this.state.name}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Email</h5>
                                        <input readOnly value={this.state.email}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Telemóvel</h5>
                                        <input readOnly value={this.state.phone}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Data Nascimento</h5>
                                        <input readOnly type="date" value={this.state.birthDate} />
                                        {(() => {
                                            if (this.state.address !== "") {
                                                return (
                                                    <div>
                                                        <h5 style={{ fontWeight: 'bold' }}>Morada (Concelho)</h5>
                                                        <input readOnly value={this.state.address}></input>
                                                    </div>
                                                )
                                            }
                                        })()}
                                        <h5 style={{ fontWeight: 'bold' }}>Nome Empresa</h5>
                                        <input readOnly value={this.state.companyName}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Morada (Concelho) Empresa</h5>
                                        <input readOnly value={this.state.companyAddress}></input>
                                    </div>
                                )
                            }
                        })()}
                        {(() => {
                            if (this.props.auth.user.role === "Administrador") {
                                return (
                                    <div className='col s7' style={{ marginTop: 20 }}>
                                        <h5 style={{ fontWeight: 'bold' }}>Nome Completo</h5>
                                        <input readOnly value={this.state.name}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Email</h5>
                                        <input readOnly value={this.state.email}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Telemóvel</h5>
                                        <input readOnly value={this.state.phone}></input>
                                        <h5 style={{ fontWeight: 'bold' }}>Data Nascimento</h5>
                                        <input readOnly type="date" value={this.state.birthDate} />
                                        {(() => {
                                            if (this.state.address !== "") {
                                                return (
                                                    <div>
                                                        <h5 style={{ fontWeight: 'bold' }}>Morada (Concelho)</h5>
                                                        <input readOnly value={this.state.address}></input>
                                                    </div>
                                                )
                                            }
                                        })()}
                                    </div>
                                )
                            }
                        })()}
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { Profile }
)(Profile);