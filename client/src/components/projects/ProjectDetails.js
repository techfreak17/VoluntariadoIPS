import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import VoluntariesList from './VoluntariesList';
import Popup from "reactjs-popup";
import '../../componentsCSS/Modal.css';
import ProjectClassification from "./ProjectClassification.js";
import "../../componentsCSS/Details.css";


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
      vacancies: "",
      vacanciesToFill: "",
      on: false,
      delete: false,
      responsibleID: "",
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
          vacancies: response.data[0].vacancies,
          vacanciesToFill: response.data[0].vacancies - response.data[0].enroled_IDs.length,
          responsibleID: response.data[0].responsibleID
        });
        var ul = document.getElementById("friendsList");

        for (var i = 0; i < this.state.interestAreas.length; i++) {
          var name = this.state.interestAreas[i];
          var li = document.createElement('li');
          li.appendChild(document.createTextNode(name));
          ul.appendChild(li);
        }
        this.insertImage(response.data[0].img);
      })
      .catch(error => console.log(error));
  }

  openModal = () => {
    this.setState({ open: true });
  }
  closeModal = () => {
    this.setState({ open: false });
  }

  openWarning = () => {
    this.setState({ delete: true });
  }
  closeWarning = () => {
    this.setState({ delete: false });
  }

  concludeProject = () => {
    axios.get('/api/projects/concludeProject/' + this.props.match.params.id)
      .then(response => {
        this.closeWarning();
        alert("O projeto " + this.state.title + " foi encerrado.");
        window.history.back();
      });
  }

  insertImage = (file) => {
    let myDiv = document.getElementById("projectImgDetails");
    let img = document.createElement('img');
    let imageFile = null;

    if (file) {
      imageFile = `data:${file.contentType};base64,${Buffer.from(file.data).toString('base64')}`;
    } else {
      imageFile = require('../layout/images/volun.png');
    }

    img.src = imageFile;
    img.alt = "(No Image)";
    img.className = "img-responsive";
    img.style.width = "40%";
    img.style.borderRadius = "5%";

    myDiv.appendChild(img);
  }

  render() {
    return (
      <div>
        <div className="card" style={{ backgroundColor: "#f2f2f2", width: "50%", margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px black" }}>
          <div className="card-header center" style={{ overflow: "hidden" }}>
            <h2 style={{ color: "#1167B1" }}><b>{this.state.title}</b></h2>
            <div id="projectImgDetails"></div>
          </div>

          <div className="card-content" style={{ paddingLeft: 50 }}>
            <div className="right" style={{ paddingRight: 25 }}>
              {(() => {
                if (this.props.auth.user.role === "Volunt??rio") {
                  return (
                    <ProjectClassification project={this.props.match.params.id}></ProjectClassification>
                  )
                }
              })()}
              <h5 style={{ color: "#1167B1" }}><b>Contactos do Respons??vel:</b></h5>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 5 }}>person</i>{this.state.name}</p>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 6 }}>email</i>{this.state.email}</p>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 6 }}>phone</i>{this.state.phone}</p>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 6 }}>business</i>{this.state.companyName}</p>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 6 }}>navigation</i>{this.state.companyAddress}</p>
              <br></br><p style={{ color: "#000000" }}><b>N??mero de Vagas Totais do Projeto:</b> {this.state.vacancies}</p>
              <p style={{ color: "#000000" }}><b>N??mero de Vagas Dispon??veis:</b> {this.state.vacanciesToFill}</p><br></br>
              {(() => {
                if (this.props.auth.user.role === "Administrador" || this.props.auth.user.id === this.state.responsibleID) {
                  return (
                    <div>
                      <button style={{ width: "100%", borderRadius: 10, fontWeight: "bold", backgroundColor: "#1167B1", marginBottom: 20 }} className="btn btn-medium hoverable center" onClick={this.openWarning}>
                        Fechar Projeto
                      </button>
                      <Popup open={this.state.delete}
                        closeOnDocumentClick
                        onClose={this.closeWarning}>
                        <div className={"Modal container"}>
                          <h5 className="center">Tem a certeza que pretende dar por concluido este Projecto?</h5>
                          <div className="botoes" style={{ display: "flex", justifyContent: "space-around", marginBottom: 10 }}>
                            <button className="btn hoverable blue accent-3" style={{ borderRadius: 5 }} onClick={this.concludeProject}>CONFIRMAR</button>
                            <button className="btn hoverable accent-3" style={{ borderRadius: 5, backgroundColor: "red" }} onClick={this.closeWarning}>CANCELAR</button>
                          </div>
                        </div>
                      </Popup>
                    </div>
                  )
                }
              })()}
            </div>
            <div>
              <h5 style={{ color: "#1167B1" }}><b>Detalhes do Projeto:</b></h5>
              <p style={{ display: "flex", alignItems: "center", color: "#000000" }}><i className="material-icons" style={{ paddingRight: 5 }}>access_time</i>{this.myDate}</p>
              <p style={{ color: "#000000" }}><b>Descri????o:</b> {this.state.description}</p>
              <p style={{ color: "#000000" }}><b>P??blico Alvo:</b> {this.state.target_audience}</p>
              <p style={{ color: "#000000" }}><b>Objetivos:</b> {this.state.objectives}</p>
              <p style={{ color: "#000000" }}><b>Resumo:</b> {this.state.synopsis}</p>
              <p style={{ color: "#000000" }}><b>??rea Interven????o:</b> {this.state.intervationArea}</p>
              <p style={{ color: "#000000" }}><b>Observa????es:</b> {this.state.observations}</p>
              <ul id="friendsList" style={{ color: "#000000" }}><b>??reas:</b></ul>

              <button style={{ width: "100%", borderRadius: 10, fontWeight: "bold", backgroundColor: "#1167B1" }} className="btn btn-medium hoverable center" onClick={this.openModal}>
                lista de Inscritos
              </button>
              <Popup open={this.state.open}
                closeOnDocumentClick
                onClose={this.closeModal}>
                <div className="Modal">
                  <VoluntariesList projectID={this.props.match.params.id} userID={this.props.auth.user.id} responsibleID={this.state.responsibleID}></VoluntariesList>
                </div>
              </Popup>
            </div><br></br>
            <Link to="/listProjects" style={{ width: "100%", borderRadius: 10, backgroundColor: "#23395D", fontWeight: "bold" }}
              className="btn btn-large hoverable accent-3 center">Voltar</Link>
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