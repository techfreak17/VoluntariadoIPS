import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Index extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      project: [],
      search: ""
    };
  }
  componentDidMount() {
    axios.get('/api/projects/listProjects')
      .then(response => {
        this.setState({
          project: response.data
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
    return this.state.project.map(function (object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      search: document.getElementById("myInput").value,
    };
    axios.post("/api/projects/searchProject", obj)
      .then(response => {
        this.setState({ project: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="container" style={{ paddingBottom: 70 }}>
        <div>
          <h1 className="center"><b>Projetos</b></h1>
          <p className="grey-text text-darken-1">
            <a href="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Voltar
            </a>
            {(() => {
              if (this.props.auth.user.role === "Empresa") {
                return (
                  <Link to="/submitProject"
                    className="right btn waves-effect waves-light hoverable"
                    style={{
                      borderRadius: 5,
                      letterSpacing: "1px",
                      backgroundColor: "#23395D"
                    }}>Propor novo Projeto</Link>
                )
              }
            })()}
                        {(() => {
              if (this.props.auth.user.role === "Administrador") {
                return (
                  <Link to="/createProject"
                    className="right btn waves-effect waves-light hoverable"
                    style={{
                      borderRadius: 5,
                      letterSpacing: "1px",
                      backgroundColor: "#23395D"
                    }}>Criar novo Projeto</Link>
                )
              }
            })()}
          </p>
          <form onSubmit={this.onSubmit}>
            <input id="myInput" type="text" placeholder="Pesquisar por título ..." name="search" onChange={this.onChangeSearch} style={{ borderBottom: "3px solid #23395D" }}></input>
            <button type="submit" className="btn waves-effect waves-light hoverable" style={{ backgroundColor: "#DDDDDD", color: "black", height: 35, fontWeight:"bolder" }}>Pesquisar</button>
          </form>
          <table className="table table-striped" style={{ marginTop: 20 }}>
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

Index.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Index);
