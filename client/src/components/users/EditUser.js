import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        number: "",
        name: "",
        role: "",
        email: "",
        password: "",
    }
  }

  componentDidMount() {
      axios.get('/api/users/editUser/'+ this.props.match.params.id)
          .then(response => {
              this.setState({ 
                number: response.data.number,
                name: response.data.name, 
                email: response.data.email,
                role: response.data.role,
                password: response.data.password               
            });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        });
      }
      onChangeName(e) {
        this.setState({
            name: e.target.value
        })  
      }
    
      onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
      }
      onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
      }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      number: this.state.number,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };
    axios.post('/api/users/updateUser/' + this.props.match.params.id, obj)
        .then(res => console.log(res.data));
        this.props.history.push('/listUsers');
        window.location.reload();
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="left">Editar Utilizador</h3>
            <p className="grey-text text-darken-1">
              <Link to="/listUsers">Voltar</Link> 
            </p>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Número:  </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={this.state.number}
                      onChange={this.onChangeNumber}
                      />
                </div>
                <div className="form-group">
                    <label>Nome: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                  <select onChange={this.onChange}
                      value={this.state.role}
                      id="role"
                      type="text"
                      className="browser-default">

                      <option value="" disabled selected>Selecionar Role</option>
                      <option value="Voluntary">Voluntário</option>
                      <option value="Entity">Empresa</option>
                  </select>
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email" 
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type ="password"
                        onChange={this.onChangePassword}
                        value={this.state.password}
                        id="password"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Editar" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}