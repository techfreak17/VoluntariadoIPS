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

  render() {
    return (
      <div>
        {this.state.role === "Voluntário" ? (
          <div className="card" style={{ backgroundColor: "#f4f4f4", width: "600px", height: "800px", margin: "10px auto", boxShadow: "1px 1px 10px 1px " }}>
            <div className="card-header" style={{ overflow: "hidden", height: "300px", width: "600px" }}>
              <img src={require('../layout/images/image1.jpeg')} alt="(Não esquecer de verificar no spam)" className="img-responsive" />
            </div>

            <div className="card-content" style={{ padding: "0px", height: "250px", width: "600px", paddingTop: -20, paddingBottom: 500, paddingLeft: 50, paddingRight: 20 }}>
              <h3 style={{ fontWeight: "bolder", color: "#50C878" }}>{this.state.name}</h3>
              <div style={{ padding: "0px", height: "250px", width: "600px", paddingTop: -20, paddingBottom: 500 }}>
                <h5 style={{ fontWeight: "bolder" }}>Detalhes do Utilizador:</h5>
                <p><i className="material-icons">email</i> {this.state.email}</p>
                <p><i className="material-icons">phone</i> {this.state.phone}</p>
                <p><i className="material-icons">home</i> {this.state.address}</p>
                <p><i className="material-icons">cake</i> {this.myDate}</p>
                <p><i className="material-icons">pan_tool</i> {this.state.member}</p>
                <p><i className="material-icons">school</i> {this.state.school}</p>
                <p><i className="material-icons">domain</i> {this.state.course}</p>
                <p><i className="material-icons">public</i> {this.state.role}</p><br></br>
                <Link to="/listUsers" style={{ width: "120px", borderRadius: 10, letterSpacing: "1.5px", fontWeight: "bold", }}
                  className="btn btn-large waves-effect waves-light hoverable black">Voltar</Link>
              </div>
            </div>
          </div>
        ) : (
            <div className="card" style={{ backgroundColor: "#f4f4f4", width: "600px", height: "800px", margin: "10px auto", boxShadow: "1px 1px 10px 1px " }}>
              <div className="card-header" style={{ overflow: "hidden", height: "300px", width: "600px" }}>
                <img src={require('../layout/images/image1.jpeg')} alt="(Não esquecer de verificar no spam)" className="img-responsive" />
              </div>

              <div className="card-content" style={{ padding: "0px", height: "250px", width: "600px", paddingTop: -20, paddingBottom: 500, paddingLeft: 50, paddingRight: 20 }}>
                <h3 style={{ fontWeight: "bolder", color: "#50C878" }}>{this.state.name}</h3>
                <div style={{ padding: "0px", height: "250px", width: "600px", paddingTop: -20, paddingBottom: 500 }}>
                  <h5 style={{ fontWeight: "bolder" }}>Detalhes do Utilizador:</h5>
                  <p><i className="material-icons">email</i> {this.state.email}</p>
                  <p><i className="material-icons">phone</i> {this.state.phone}</p>
                  <p><i className="material-icons">home</i> {this.state.address}</p>
                  <p><i className="material-icons">cake</i> {this.myDate}</p>
                  <p><i className="material-icons">location_city</i> {this.state.companyName}</p>
                  <p><i className="material-icons">domain</i> {this.state.companyAddress}</p>
                  <p><i className="material-icons">public</i> {this.state.role}</p><br></br>
                  <Link to="/listUsers" style={{ width: "120px", borderRadius: 10, letterSpacing: "1.5px", fontWeight: "bold", }}
                    className="btn btn-large waves-effect waves-light hoverable black">Voltar</Link>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}