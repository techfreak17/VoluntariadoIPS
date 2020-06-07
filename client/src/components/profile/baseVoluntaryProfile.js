import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';



class baseVoluntaryProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
         name: '',
         email: '',
         phone: '',
         address: '',
         birthDate: '',
         memberIPS: '',
         schoolIPS: '',
         courseIPS: '',
         interestAreas: [],
         reasons: [],
         observations: '',
         role:'',
         errors: {}
        };
        
    }

    componentDidMount() {
       

            axios.get('/api/Voluntaries/getVoluntaryUserDetails/' + this.props.match.params.id)
            .then(responseArr => {
              this.setState({
                name: responseArr.data.name,
                email: responseArr.data.email,
                phone: responseArr.data.phone,
                address: responseArr.data.address,
                birthDate: responseArr.data.birthDate,
                memberIPS: responseArr.data.memberIPS,
                schoolIPS: responseArr.data.schoolIPS,
                courseIPS: responseArr.data.courseIPS,
                interestAreas: responseArr.data.interestAreas,
                reasons: responseArr.data.reasons,
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
                            <h5 style={{fontWeight: 'bold'}}>Membro</h5>
                            <input value={this.state.memberIPS}></input>
                            <h5 style={{fontWeight: 'bold'}}>Escola</h5>
                            <input value={this.state.schoolIPS}></input>
                            <h5 style={{fontWeight: 'bold'}}>Curso</h5>
                            <input value={this.state.courseIPS}></input>
                            <button style={{float: 'right'}}>Editar Perfil</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

baseVoluntaryProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { baseVoluntaryProfile }
)(baseVoluntaryProfile);