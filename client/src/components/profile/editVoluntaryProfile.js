import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';



class editVoluntaryProfile extends Component {
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

    onChangeNome(a){
        this.setState({name: a.target.value});
    }

    onChangeEmail(a){
        this.setState({email: a.target.value});
    }

    onChangeTelemóvel(a){
        this.setState({phone: a.target.value});
    }

    onChangeMorada(a){
        this.setState({address: a.target.value});
    }

    onChangeEscola(a){
        this.setState({schoolIPS: a.target.value});
    }

    onChangeCurso(a){
        this.setState({courseIPS: a.target.value});
    }
   
   
    onChangeBirthDate(a){
        this.setState({birthDate: a.target.value});
    }

    onChangeMemberIPS(a){
        this.setState({memberIPS: a.target.value});
    }

    onChangeInterestAreas(a){
        this.setState({interestAreas: a.target.value});
    }

    onChangeReasons(a){
        this.setState({reasons: a.target.value});
    }

    onChangeObservations(a){
        this.setState({observations: a.target.value});
    }


    onEdit(e){
        e.preventDefault();
        const obj = {
          //AINDA NAO SEI O QUE METER AQUI
          //ATENÇAO O LINK PODE ESTAR MAL
        };
        axios.post('/api/users/updateUser/' + this.props.match.params.id, obj)
          .then(res => console.log(res.data));
        this.props.history.push('/baseProfile/'+this.props.match.params.id);
        window.location.reload();
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
                            <input value={this.state.name} onChange={this.onChangeNome}></input>
                            <h5 style={{fontWeight: 'bold'}}>Email</h5>
                            <input value={this.state.email} onChange={this.onChangeEmail}></input>
                            <h5 style={{fontWeight: 'bold'}}>Telemóvel</h5>
                            <input value={this.state.phone} onChange={this.onChangeTelemóvel}></input>
                            <h5 style={{fontWeight: 'bold'}}>Morada</h5>
                            <input value={this.state.address} onChange={this.onChangeMorada}></input>
                            <h5 style={{fontWeight: 'bold'}}>Data de Nascimento</h5>
                            <input value={this.state.birthDate} onChange={this.onChangeBirthDate}></input>
                            <h5 style={{fontWeight: 'bold'}}>Membro</h5>
                            <input value={this.state.memberIPS} onChange={this.onChangeMemberIPS}></input>
                            <h5 style={{fontWeight: 'bold'}}>Escola</h5>
                            <input value={this.state.schoolIPS} onChange={this.onChangeEscola}></input>
                            <h5 style={{fontWeight: 'bold'}}>Curso</h5>
                            <input value={this.state.courseIPS} onChange={this.onChangeCurso}></input>
                            <h5 style={{fontWeight: 'bold'}}>Observações</h5>
                            <input value={this.state.observations} onChange={this.onChangeObservations}></input>
                            <button style={{float: 'right'}} onClick={this.onEdit}>Confirmar</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

editVoluntaryProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { editVoluntaryProfile }
)(editVoluntaryProfile);