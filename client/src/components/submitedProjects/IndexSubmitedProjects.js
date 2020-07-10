import React, { Component } from 'react';
import axios from 'axios';
import SubmitedProjectsRow from './SubmitedProjectsRow';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class IndexSubmitedProjects extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      submitedProjects: [],
      search: ""
    };
  }
  componentDidMount() {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }
    axios.get('/api/submitedProjects/listSubmitedProjects')
      .then(response => {
        this.setState({
          submitedProjects: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  tabRow() {
    return this.state.submitedProjects.map(function (object, i) {
      return <SubmitedProjectsRow obj={object} key={i} />;
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      search: document.getElementById("myInput").value,
    };
    axios.post("/api/submitedProjects/searchSubmitedProject", obj)
      .then(response => {
        this.setState({ submitedProjects: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="container" style={{ paddingBottom: 70 }}>
        <div>
          <h1 className="center"><b>Propostas de Projetos</b></h1>
          <p className="grey-text text-darken-1">
            <a href="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Voltar
            </a>
          </p>
          <form onSubmit={this.onSubmit}>
            <input id="myInput" type="text" placeholder="Pesquisar por título ..." name="search" onChange={this.onChangeSearch} style={{ borderBottom: "3px solid #23395D" }}></input>
            <button type="submit" className="btn waves-effect waves-light hoverable" style={{ backgroundColor: "#DDDDDD", color: "black", height: 35, fontWeight: "bolder" }}>Pesquisar</button>
          </form>
          <table className="responsive-table" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Data</th>
                <th>Descrição</th>
                <th colSpan="2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.tabRow()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

IndexSubmitedProjects.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(IndexSubmitedProjects);
