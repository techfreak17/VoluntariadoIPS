import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';



class baseCompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
         name: '',
         email: '',
         phone: '',
         address: '',
         birthDate: '',
         companyName: '',
         companyAddress: '',
         listProjects: '',
         observations: '',
         role:'',
         errors: {}
        };
    }

    componentDidMount() {
       

            axios.get('/api/Company/getCompanyUserDetails/' + this.props.match.params.id)
            .then(responseArr => {
              this.setState({
                name: responseArr.data.name,
                email: responseArr.data.email,
                phone: responseArr.data.phone,
                address: responseArr.data.address,
                birthDate: responseArr.data.birthDate,
                companyName: responseArr.data.companyName,
                companyAddress: responseArr.data.companyAddress,
                listProjects: responseArr.data.listProjects,
                observations: responseArr.data.observations,
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
       
        console.log(this.state.role);
        return (
            <div style={{paddingBottom: '5%'}}> 
                <div className='container'>
                    <div className='row'>
                        <div className='col s4'>
                            <div>
                                <a className="" href="/dashboard"><img src={require('../layout/images/avatar.jpg')}
                                    alt="Avatar"
                                    className="img-responsive"
                                    style={{ position: "relative", height: "auto", width: "250px",paddingTop:'20%',borderRadius: '50%' }} />
                                </a>
                                <h4>{this.state.name}</h4>
                                <h4 style={{textDecoration: 'underline'}}>{this.state.role}</h4>
                            </div>
                        </div>
                        <div className='col s1' />
                        <div className='col s7'>
                            <h5 style={{fontWeight: 'bold'}}>Nome Completo</h5>
                            <input value={this.state.name}></input>
                            <h5 style={{fontWeight: 'bold'}}>Email</h5>
                            <input value={this.state.email}></input>
                            <h5 style={{fontWeight: 'bold'}}>Telemóvel</h5>
                            <input value={this.state.phone}></input>
                            <h5 style={{fontWeight: 'bold'}}>Morada</h5>
                            <input value={this.state.address}></input>
                            <h5 style={{fontWeight: 'bold'}}>Data de Nascimento</h5>
                            <input value={this.state.birthDate}></input>
                            <h5 style={{fontWeight: 'bold'}}>Nome da Companhia</h5>
                            <input value={this.state.companyName}></input>
                            <h5 style={{fontWeight: 'bold'}}>Morada da Companhia</h5>
                            <input value={this.state.companyAddress}></input>
                            <h5 style={{fontWeight: 'bold'}}>Observações</h5>
                            <input value={this.state.observations}></input>
                            <button style={{float: 'right'}}>Editar Perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

baseCompanyProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { baseCompanyProfile }
)(baseCompanyProfile);