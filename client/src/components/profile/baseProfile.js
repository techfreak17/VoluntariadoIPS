import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';



class baseProfile extends Component {
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
          companyAddress: "",
          companyName: "",
          role: "",
          errors: {}
        };
        
    }

    componentDidMount() {
       

            axios.get('/api/users/getUserDetails/' + this.props.match.params.id)
            .then(responseArr => {
              this.setState({
                name: responseArr.data.name,
                email: responseArr.data.email,
                phone: responseArr.data.phone,
                address: responseArr.data.address,
                member: responseArr.data.memberIPS,
                school: responseArr.data.schoolIPS,
                course: responseArr.data.courseIPS,
                companyAddress: responseArr.data.companyAddress,
                companyName: responseArr.data.companyName,
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
                            <h5 style={{fontWeight: 'bold'}}>Escola</h5>
                            <input value={this.state.school}></input>
                            <h5 style={{fontWeight: 'bold'}}>Curso</h5>
                            <input value={this.state.course}></input>
                            <h5 style={{fontWeight: 'bold'}}>Áreas de Interesse</h5>
                            <input value={this.state.companyName}></input>
                            <button style={{float: 'right'}}>Editar Perfil</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

baseProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { baseProfile }
)(baseProfile);