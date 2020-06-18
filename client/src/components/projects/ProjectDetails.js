import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ListVoluntaries from './ListVoluntaries';



class ProjectDetails extends Component {
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
      role: "",
      on: false
    }
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/projects/getProject/' + this.props.match.params.id),
      axios.get('/api/projects/getProjectUser/' + this.props.match.params.id),
      axios.get('/api/projects/getProjectUserDetails/' + this.props.match.params.id),
    ])
      .then(responseArr => {
        this.myDate = new Date(responseArr[0].data.date);
        this.myDate = this.myDate.toLocaleString();
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

        for (var i = 0; i < this.state.interestAreas.length; i++) {
          var name = this.state.interestAreas[i];
          var li = document.createElement('li');
          li.appendChild(document.createTextNode(name));
          ul.appendChild(li);
        }
      })
      .catch(error => console.log(error));
  }

  returnList = () => {
    console.log(this.state.role);
    console.log(this.props);
    if(this.state.role==="Empresa"||this.state.role==="Admin")
      this.setState({on: !this.state.on})

    else
     console.log("Não tens autorização");

     console.log(this.state.on);
  }

  render() {
    return (
      <div>
        <div className="card" style={{ backgroundColor: "#00000", width: 900, margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px black" }}>
          <div className="card-header center" style={{ overflow: "hidden", height: 400, width: "100%" }}>
            <h2 style={{ color: "#1167B1" }}><b>{this.state.title}</b></h2>
            <img src={require('../layout/images/volun.png')} alt="(Não esquecer de verificar no spam)" className="img-responsive" style={{ width: "40%", height: "70%" }} />
          </div>
          <div className="card-content" style={{ paddingLeft: 50 }}>
            <div className="right" style={{ paddingRight: 25 }}>
              <h5 style={{ color: "#1167B1" }}><b>Contactos do Responsável:</b></h5>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 5 }}>person</i>{this.state.name}</p>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 6 }}>email</i>{this.state.email}</p>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 6 }}>phone</i>{this.state.phone}</p>
              {(() => {
                if (this.state.role === "Empresa") {
                  return (
                    <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 6 }}>business</i>{this.state.companyName}</p>
                  )
                }
              })()}
              {(() => {
                if (this.state.role === "Empresa") {
                  return (
                    <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 6 }}>navigation</i>{this.state.companyAddress}</p>
                  )
                }
              })()}
            </div>
            <div>
              <h5 style={{ color: "#1167B1" }}><b>Detalhes do Projeto:</b></h5>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 5 }}>access_time</i>{this.myDate}</p>
              <p style={{ color: "#000000" }}><b>Descrição:</b> {this.state.description}</p>
              <p style={{ color: "#000000" }}><b>Público Alvo:</b> {this.state.target_audience}</p>
              <p style={{ color: "#000000" }}><b>Objetivos:</b> {this.state.objectives}</p>
              <p style={{ color: "#000000" }}><b>Resumo:</b> {this.state.synopsis}</p>
              <p style={{ color: "#000000" }}><b>Área Intervenção:</b> {this.state.intervationArea}</p>
              <p style={{ color: "#000000" }}><b>Observações:</b> {this.state.observations}</p>
              <ul id="friendsList" style={{ color: "#000000" }}><b>Áreas:</b></ul>
              <button onClick={this.returnList}>Ver Voluntários</button>
              <div>
                {this.state.on && <ListVoluntaries/>}
              </div>
            </div>
            <Link to="/listProjects" style={{ width: 120, borderRadius: 10, letterSpacing: 1.5, fontWeight: "bold", }}
              className="btn btn-large waves-effect waves-light hoverable black center">Voltar</Link>
          </div>
        </div>
      </div>
    );
  }
}

ProjectDetails.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ProjectDetails);