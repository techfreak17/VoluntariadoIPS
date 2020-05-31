import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      synopsis: "",
      intervationArea: "",
      target_audience: "",
      objectives: "",
      description: "",
      date: "",
      observations: "",
      name: "",
      email: "",
      phone: "",
      companyAddress: "",
      companyName: "",
      role: ""
    }
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/projects/getProject/' + this.props.match.params.id),
      axios.get('/api/projects/getUser/' + this.props.match.params.id),
      axios.get('/api/projects/getUserDetails/' + this.props.match.params.id),
    ])
      .then(responseArr => {
        this.myDate = new Date(responseArr[0].data.date);
        console.log(this.myDate);
        this.myDate = this.myDate.toLocaleString();
        console.log(this.myDate);
        console.log(responseArr[0].data);
        this.setState({
          name: responseArr[2].data.name,
          email: responseArr[2].data.email,
          phone: responseArr[2].data.phone,
          companyAddress: responseArr[2].data.companyAddress,
          companyName: responseArr[2].data.companyName,
          title: responseArr[0].data.title,
          synopsis: responseArr[0].data.synopsis,
          intervationArea: responseArr[0].data.intervationArea,
          target_audience: responseArr[0].data.target_audience,
          objectives: responseArr[0].data.objectives,
          description: responseArr[0].data.description,
          observations: responseArr[0].data.observations,
          interestAreas: responseArr[0].data.interestAreas,
          role: responseArr[1].data.role,
        });
        var ul = document.getElementById("friendsList");

        console.log(this.state.interestAreas);

        for (var i = 0; i < this.state.interestAreas.length; i++) {
          var name = this.state.interestAreas[i];
          var li = document.createElement('li');
          li.appendChild(document.createTextNode(name));
          ul.appendChild(li);
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        {this.state.role === "Empresa" ? (

          <div className="card" style={{ backgroundColor: "#FEF4E8", width: "850px", height: "900px", margin: "10px auto", marginBottom: "75px", boxShadow: "1px 1px 10px 5px #" }}>

            <div className="card-header center" style={{ overflow: "hidden", height: "40%", width: "100%" }}>
              <h2 style={{ fontWeight: "bold"}}>{this.state.title}</h2>
              <img src={require('../layout/images/image.jpg')} alt="(Não esquecer de verificar no spam)" className="img-responsive" />
            </div>

            <div className="card-content" style={{ height: "250px", width: "1000px", paddingLeft: 40, paddingRight: 20 }}>
              <div style={{ height: "250px", width: "600px" }}>
                <h5 style={{ fontWeight: "bolder" }}>Contactos do Responsável:</h5>
                <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons">person</i>{this.state.name}</p>
                <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons">email</i>{this.state.email}</p>
                <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons">phone</i>{this.state.phone}</p>
                <h5 style={{ fontWeight: "bolder" }}>Detalhes do Projeto:</h5>
                <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons">access_time</i>{this.myDate}</p>
                <p><b>Descrição:</b> {this.state.description}</p>
                <p><b>Público Alvo:</b> {this.state.target_audience}</p>
                <p><b>Objetivos:</b> {this.state.objectives}</p>
                <p><b>Resumo:</b> {this.state.synopsis}</p>
                <p><b>Área Intervenção:</b> {this.state.intervationArea}</p>
                <p><b>Observações:</b> {this.state.observations}</p>
                <ul id="friendsList"><b>Áreas:</b></ul>
                <Link to="/listProjects" style={{ width: "120px", borderRadius: 10, letterSpacing: "1.5px", fontWeight: "bold", }}
                  className="btn btn-large waves-effect waves-light hoverable black">Voltar</Link>
              </div>
            </div>
          </div>
        ) : (
            <div className="card" style={{ backgroundColor: "#f4f4f4", width: "600px", height: "800px", margin: "10px auto", boxShadow: "1px 1px 10px 1px " }}>
              <div className="card-header" style={{ overflow: "hidden", height: "300px", width: "600px" }}>
                <img src={require('../layout/images/image.jpg')} alt="(Não esquecer de verificar no spam)" className="img-responsive" />
              </div>

              <div className="card-content" style={{ padding: "0px", height: "250px", width: "600px", paddingTop: -20, paddingBottom: 500, paddingLeft: 50, paddingRight: 20 }}>
                <h3 style={{ fontWeight: "bolder", color: "#50C878" }}>{this.state.title}</h3>
                <div style={{ padding: "0px", height: "250px", width: "600px", paddingTop: -20, paddingBottom: 500 }}>
                  <h5 style={{ fontWeight: "bolder" }}>Contactos do Responsável:</h5>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons">person</i> {this.state.name}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons">email</i> {this.state.email}</p>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons">phone</i> {this.state.phone}</p>
                  <h5 style={{ fontWeight: "bolder" }}>Detalhes do Projeto:</h5>
                  <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons">access_time</i> {this.state.date}</p>
                  <p><b>Descrição</b> {this.state.description}</p>
                  <Link to="/listProjects" style={{ width: "120px", borderRadius: 10, letterSpacing: "1.5px", fontWeight: "bold", }}
                    className="btn btn-large waves-effect waves-light hoverable black">Voltar</Link>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}