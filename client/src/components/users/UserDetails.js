import React, { Component } from 'react';
import axios from 'axios';
import "../../componentsCSS/Details.css";

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
    axios.get('/api/users/getUserDetails/' + this.props.match.params.id)
      .then(response => {
        this.myDate = new Date(response.data[1].birthDate);
        this.myDate = this.myDate.toLocaleDateString();
        this.setState({
          name: response.data[1].name,
          email: response.data[1].email,
          phone: response.data[1].phone,
          address: response.data[1].address,
          member: response.data[1].memberIPS,
          school: response.data[1].schoolIPS,
          course: response.data[1].courseIPS,
          companyAddress: response.data[1].companyAddress,
          companyName: response.data[1].companyName,
          role: response.data[0].role
        });
        this.insertImage(response.data[0].img);
      })
      .catch(error => console.log(error));
  }

  goBack() {
    window.history.back();
  }

  insertImage = (file) => {
    let myDiv = document.getElementById("userImgDetails");
    let img = document.createElement('img');
    let imageFile = null;

    if (file) {
      imageFile = `data:${file.contentType};base64,${Buffer.from(file.data).toString('base64')}`;
    } else {
      imageFile = require('../layout/images/avatar.jpg');
    }

    img.src = imageFile;
    img.alt = "(No Image)";
    img.className = "img-responsive";
    img.style.width = "30%";
    img.style.borderRadius = "5%";

    myDiv.appendChild(img);
  }


  render() {
    return (
      <div>
        {(() => {
          if (this.state.role === "Voluntário") {
            return (
              <div className="card" style={{ backgroundColor: "#f2f2f2", width: "50%", margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px " }}>

                <div className="card-header center" style={{ overflow: "hidden"}}>
                  <h3 style={{ color: "#1167B1" }}><b>{this.state.name}</b></h3>
                  <div id="userImgDetails"></div>
                </div>

                <div className="card-content" style={{ paddingLeft: 45, paddingTop: -100 }}>
                  <h5 style={{ color: "#1167B1" }}><b>Detalhes do Utilizador:</b></h5>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 5 }}>email</i> {this.state.email}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>phone</i> {this.state.phone}</p>
                  {(() => {
                    if (this.state.address !== "") {
                      return (
                        <div>
                          <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>home</i> {this.state.address}</p>
                        </div>
                      )
                    }
                  })()}
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>cake</i> {this.myDate}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>person</i> {this.state.member}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>school</i> {this.state.school}</p>
                  {(() => {
                    if (this.state.course !== "") {
                      return (
                        <div>
                          <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>domain</i> {this.state.course}</p>
                        </div>
                      )
                    }
                  })()}
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 7 }}>public</i> {this.state.role}</p><br></br>
                  <button onClick={this.goBack} style={{ width: "100%", borderRadius: 10, backgroundColor: "#23395D", fontWeight: "bold"}}
                    className="btn btn-large hoverable accent-3 center">Voltar</button>
                </div>
              </div>
            )
          }
        })()}
        {(() => {
          if (this.state.role === "Empresa") {
            return (
              <div className="card" style={{ backgroundColor: "#00000", width: "50%", margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px " }}>

                <div className="card-header center" style={{ overflow: "hidden", width: "100%" }}>
                  <h3 style={{ color: "#1167B1" }}><b>{this.state.name}</b></h3>
                  <div id="userImgDetails"></div>
                </div>

                <div className="card-content" style={{ paddingLeft: 45 }}>
                  <h5 style={{ color: "#1167B1" }}><b>Detalhes do Utilizador:</b></h5>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 5 }}>email</i> {this.state.email}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>phone</i> {this.state.phone}</p>
                  {(() => {
                    if (this.state.address !== "") {
                      return (
                        <div>
                          <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>home</i> {this.state.address}</p>
                        </div>
                      )
                    }
                  })()}
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>cake</i> {this.myDate}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>person</i> {this.state.role}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>domain</i> {this.state.companyName}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 7 }}>public</i> {this.state.companyAddress}</p><br></br>
                  <button onClick={this.goBack} style={{ width: "100%", borderRadius: 10, backgroundColor: "#23395D", fontWeight: "bold"}}
                    className="btn btn-large hoverable accent-3 center">Voltar</button>
                </div>
              </div>
            )
          }
        })()}
        {(() => {
          if (this.state.role === "Administrador") {
            return (
              <div className="card" style={{ backgroundColor: "#00000", width: "50%", margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px " }}>

                <div className="card-header center" style={{ overflow: "hidden", width: "100%" }}>
                  <h3 style={{ color: "#1167B1" }}><b>{this.state.name}</b></h3>
                  <div id="userImgDetails"></div>
                </div>

                <div className="card-content" style={{ paddingLeft: 45 }}>
                  <h5 style={{ color: "#1167B1" }}><b>Detalhes do Utilizador:</b></h5>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 5 }}>email</i> {this.state.email}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>phone</i> {this.state.phone}</p>
                  {(() => {
                    if (this.state.address !== "") {
                      return (
                        <div>
                          <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>home</i> {this.state.address}</p>
                        </div>
                      )
                    }
                  })()}
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>cake</i> {this.myDate}</p>
                  <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons small" style={{ paddingRight: 6 }}>person</i> {this.state.role}</p><br></br>
                  <button onClick={this.goBack} style={{ width: "100%", borderRadius: 10, backgroundColor: "#23395D", fontWeight: "bold"}}
                    className="btn btn-large hoverable accent-3 center">Voltar</button>
                </div>
              </div>
            )
          }
        })()}
      </div>
    );
  }
}