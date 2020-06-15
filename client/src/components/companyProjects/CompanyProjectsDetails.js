import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class CompanyProjectDetails extends Component {
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
    axios.get('/api/projects/getCompanyProjectDetails/' + this.props.match.params.id)
    .then(response => {
        this.myDate = new Date(response.data[0].date);
        this.myDate = this.myDate.toLocaleString();
        this.setState({
          name: response.data[2].name,
          email: response.data[2].email,
          phone: response.data[2].phone,
          companyAddress: response.data[2].companyAddress,
          companyName: response.data[2].companyName,
          title: response.data[0].title,
          synopsis: response.data[0].synopsis,
          intervationArea: response.data[0].intervationArea,
          target_audience: response.data[0].target_audience,
          objectives: response.data[0].objectives,
          description: response.data[0].description,
          observations: response.data[0].observations,
          interestAreas: response.data[0].interestAreas,
          role: response.data[1].role,
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

  render() {
    return (
      <div>
        <div className="card" style={{ backgroundColor: "#FEF4E8", width: 900, margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px black" }}>
          <div className="card-header center" style={{ overflow: "hidden", height: 400, width: "100%" }}>
            <h2><b>{this.state.title}</b></h2>
            <img src={require('../layout/images/volun.png')} alt="(Não esquecer de verificar no spam)" className="img-responsive" style={{ width: "90%" }} />
          </div>
          <div className="card-content" style={{ paddingLeft: 50 }}>
            <div className="right" style={{ paddingRight: 25 }}>
              <h5><b>Contactos do Responsável:</b></h5>
              <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons" style={{ paddingRight: 5 }}>person</i>{this.state.name}</p>
              <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons" style={{ paddingRight: 6 }}>email</i>{this.state.email}</p>
              <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons" style={{ paddingRight: 6 }}>phone</i>{this.state.phone}</p>
              {(() => {
                if (this.state.role === "Empresa") {
                  return (
                    <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons" style={{ paddingRight: 6 }}>business</i>{this.state.companyName}</p>
                  )
                }
              })()}
              {(() => {
                if (this.state.role === "Empresa") {
                  return (
                    <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons" style={{ paddingRight: 6 }}>navigation</i>{this.state.companyAddress}</p>
                  )
                }
              })()}
            </div>
            <div>
              <h5><b>Detalhes do Projeto:</b></h5>
              <p style={{ display: "flex", alignItems: "center" }}><i className="material-icons" style={{ paddingRight: 5 }}>access_time</i>{this.myDate}</p>
              <p><b>Descrição:</b> {this.state.description}</p>
              <p><b>Público Alvo:</b> {this.state.target_audience}</p>
              <p><b>Objetivos:</b> {this.state.objectives}</p>
              <p><b>Resumo:</b> {this.state.synopsis}</p>
              <p><b>Área Intervenção:</b> {this.state.intervationArea}</p>
              <p><b>Observações:</b> {this.state.observations}</p>
              <ul id="friendsList"><b>Áreas:</b></ul>
            </div>
            <Link to="/listProjectsCompany" style={{ width: 120, borderRadius: 10, letterSpacing: 1.5, fontWeight: "bold", }}
              className="btn btn-large waves-effect waves-light hoverable black center">Voltar</Link>
          </div>
        </div>
      </div>
    );
  }
}

CompanyProjectDetails.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(CompanyProjectDetails);