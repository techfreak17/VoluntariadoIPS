import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';



class editAdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
         name: '',
         email: '',
         phone: '',
         address: '',
         birthDate: '',
         role:'',
         errors: {}
        };
    }

    componentDidMount() {
       

            axios.get('/api/Admin/getAdminUserDetails/' + this.props.match.params.id)
            .then(responseArr => {
              this.setState({
                name: responseArr.data.name,
                email: responseArr.data.email,
                phone: responseArr.data.phone,
                address: responseArr.data.address,
                birthDate: responseArr.data.birthDate,
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

    onChangeBirthDate(a){
        this.setState({birthDate: a.target.value});
    }

    onEdit(e){
        e.preventDefault();
        const obj = {
          //AINDA NAO SEI O QUE METER AQUI
        };
        axios.post('/api/Admin/editUser/' + this.props.match.params.id, obj)
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
                            <button style={{float: 'right'}} onClick={this.onEdit}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

editAdminProfile.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { editAdminProfile }
)(editAdminProfile);