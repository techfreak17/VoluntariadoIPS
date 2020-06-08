import React, { Component } from 'react';
import axios from 'axios';
//import M from 'materialize-css';
import { Link } from "react-router-dom";


export default class Edit extends Component {
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
      role: "",
      companyName: "",
      companyAddress: ""
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
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.state.role === "Voluntário") {
            return (
              <div className="card" style={{ backgroundColor: "#FEF4E8", width: 900, margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px " }}>

                <div className="card-header center" style={{ overflow: "hidden", height: 400, width: "100%" }}>
                  <h3><b>{this.state.name}</b></h3>
                  <img src={require('../layout/images/image1.jpeg')} alt="(Não esquecer de verificar no spam)" className="img-responsive" style={{ width: "90%" }} />
                </div>

                <div className="card-content" style={{ paddingLeft: 45 }}>
                  <h5><b>Detalhes do Utilizador:</b></h5>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 5 }}>email</i> {this.state.email}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>phone</i> {this.state.phone}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>home</i> {this.state.address}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>cake</i> {this.myDate}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>person</i> {this.state.member}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>school</i> {this.state.school}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>domain</i> {this.state.course}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 7 }}>public</i> {this.state.role}</p><br></br>
                  <Link to="/listUsers" style={{ width: 120, borderRadius: 10, letterSpacing: 1.5, fontWeight: "bold" }}
                    className="btn btn-large waves-effect waves-light hoverable black">Voltar</Link>
                </div>
              </div>
            )
          }
        })()}
        {(() => {
          if (this.state.role === "Empresa") {
            return (
              <div className="card" style={{ backgroundColor: "#FEF4E8", width: 900, margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px " }}>

                <div className="card-header center" style={{ overflow: "hidden", height: 400, width: "100%" }}>
                  <h3><b>{this.state.name}</b></h3>
                  <img src={require('../layout/images/image1.jpeg')} alt="(Não esquecer de verificar no spam)" className="img-responsive" style={{ width: "90%" }} />
                </div>

                <div className="card-content" style={{ paddingLeft: 45 }}>
                  <h5 style={{ fontWeight: "bolder" }}>Detalhes do Utilizador:</h5>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 5 }}>email</i> {this.state.email}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>phone</i> {this.state.phone}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>home</i> {this.state.address}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>cake</i> {this.myDate}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>person</i> {this.state.role}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>domain</i> {this.state.companyName}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 7 }}>public</i> {this.state.companyAddress}</p><br></br>
                  <Link to="/listUsers" style={{ width: 120, borderRadius: 10, letterSpacing: 1.5, fontWeight: "bold" }}
                    className="btn btn-large waves-effect waves-light hoverable black">Voltar</Link>
                </div>
              </div>
            )
          }
        })()}
        {(() => {
          if (this.state.role === "Administrador") {
            return (
              <div className="card" style={{ backgroundColor: "#FEF4E8", width: 900, margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px " }}>

                <div className="card-header center" style={{ overflow: "hidden", height: 400, width: "100%" }}>
                  <h3><b>{this.state.name}</b></h3>
                  <img src={require('../layout/images/image1.jpeg')} alt="(Não esquecer de verificar no spam)" className="img-responsive" style={{ width: "90%" }} />
                </div>

                <div className="card-content" style={{ paddingLeft: 45 }}>
                  <h5 style={{ fontWeight: "bolder" }}>Detalhes do Utilizador:</h5>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 5 }}>email</i> {this.state.email}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>phone</i> {this.state.phone}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>home</i> {this.state.address}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>cake</i> {this.myDate}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons small" style={{ paddingRight: 6 }}>person</i> {this.state.role}</p><br></br>
                  <Link to="/listUsers" style={{ width: 120, borderRadius: 10, letterSpacing: 1.5, fontWeight: "bold" }}
                    className="btn btn-large waves-effect waves-light hoverable black">Voltar</Link>
                </div>
              </div>
            )
          }
        })()}
      </div>
    );
  }
}