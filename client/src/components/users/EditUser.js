import React, { Component } from 'react';
import axios from 'axios';

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
    axios.all([
      axios.get('/api/users/getUserDetails/' + this.props.match.params.id),
      axios.get('/api/users/getUser/' + this.props.match.params.id)
    ])
      .then(responseArr => {
        this.myDate = new Date(responseArr[0].data.birthDate);
        this.myDate = this.myDate.toLocaleDateString();
        console.log(responseArr[0].data);
        this.setState({
          name: responseArr[0].data.name,
          email: responseArr[0].data.email,
          phone: responseArr[0].data.phone,
          address: responseArr[0].data.address,
          member: responseArr[0].data.memberIPS,
          school: responseArr[0].data.schoolIPS,
          course: responseArr[0].data.courseIPS,
          companyAddress: responseArr[0].data.companyAddress,
          companyName: responseArr[0].data.companyName,
          role: responseArr[1].data.role
        });
      })
      .catch (error => console.log(error));
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
      <div className="container">
        <div className="container">
          <h3 align="left">Editar Utilizador</h3>
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
              <label>Email: </label>
              <input type="email"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="form-group">
              <label >Password</label>
              <input type="password"
                onChange={this.onChangePassword}
                value={this.state.password}
                id="password"
                className="form-control"
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
            <div className="col s12 " style={{ paddingBottom: 60 }}>
              <button style={{ width: "150px", borderRadius: 10, letterSpacing: "1.5px", marginTop: "1rem", marginLeft: "16%" }}
                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Editar
              </button>
              <a style={{ width: "150px", borderRadius: 10, letterSpacing: "1.5px", marginTop: "1rem", backgroundColor: "red", marginRight: "16%" }}
                href="/listUsers" className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar
              </a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}