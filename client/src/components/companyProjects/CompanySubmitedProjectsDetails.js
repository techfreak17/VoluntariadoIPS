import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class CompanySubmitedProjectsDetails extends Component {
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
      vacancies: ""
    }
  }

  componentDidMount() {
    axios.get('/api/projects/getSubmitedProjectUserDetails/' + this.props.match.params.id)
    .then(responseArr => {
        console.log(responseArr);
        this.myDate = new Date(responseArr.data[0].date);
        this.myDate = this.myDate.toLocaleString();
        this.setState({
          name: responseArr.data[2].name,
          email: responseArr.data[2].email,
          phone: responseArr.data[2].phone,
          companyAddress: responseArr.data[2].companyAddress,
          companyName: responseArr.data[2].companyName,
          title: responseArr.data[0].title,
          synopsis: responseArr.data[0].synopsis,
          intervationArea: responseArr.data[0].intervationArea,
          target_audience: responseArr.data[0].target_audience,
          objectives: responseArr.data[0].objectives,
          description: responseArr.data[0].description,
          observations: responseArr.data[0].observations,
          interestAreas: responseArr.data[0].interestAreas,
          role: responseArr.data[1].role,
          vacancies : responseArr.data[0].vacancies,
          vacanciesToFill: responseArr.data[0].vacancies - responseArr.data[0].enroled_IDs.length
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

  goBack() {
    window.history.back();
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
              <br></br><p style={{ color: "#000000" }}><b>Número de Vagas Totais do Projeto:</b> {this.state.vacancies}</p>
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
            </div>
            <button onClick={this.goBack} style={{ width: 120, borderRadius: 10, letterSpacing: 1.5, fontWeight: "bold", }}
              className="btn btn-large waves-effect waves-light hoverable black center">Voltar</button>
          </div>
        </div>
      </div>
    );
  }
}

CompanySubmitedProjectsDetails.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(CompanySubmitedProjectsDetails);