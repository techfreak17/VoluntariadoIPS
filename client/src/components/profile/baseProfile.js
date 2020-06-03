import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";



class baseProfile extends Component {
    constructor() {
        super();
        this.state = {
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

    render() {
        const { errors } = this.state;

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
                                <h4>Bernardo Fortaleza</h4>
                                <h4 style={{textDecoration: 'underline'}}>Voluntário</h4>
                            </div>
                        </div>
                        <div className='col s1' />
                        <div className='col s7'>
                            <h5 style={{fontWeight: 'bold'}}>Nome Completo</h5>
                            <input value='Bernardo'></input>
                            <h5 style={{fontWeight: 'bold'}}>Email</h5>
                            <input value='Bernardo'></input>
                            <h5 style={{fontWeight: 'bold'}}>Telemóvel</h5>
                            <input value='Bernardo'></input>
                            <h5 style={{fontWeight: 'bold'}}>Morada</h5>
                            <input value='Bernardo'></input>
                            <h5 style={{fontWeight: 'bold'}}>Data Nascimento</h5>
                            <input value='Bernardo'></input>
                            <h5 style={{fontWeight: 'bold'}}>Escola</h5>
                            <input value='Bernardo'></input>
                            <h5 style={{fontWeight: 'bold'}}>Curso</h5>
                            <input value='Bernardo'></input>
                            <h5 style={{fontWeight: 'bold'}}>Áreas de Interesse</h5>
                            <input value='Bernardo'></input>
                            <button style={{float: 'right'}}>Confirmar</button>
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