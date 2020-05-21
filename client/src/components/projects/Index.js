import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link } from "react-router-dom";

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = { project: [] };
  }
  componentDidMount() {
    axios.get('/api/projects/listProjects')
      .then(response => {
        this.setState({ project: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  tabRow() {
    return this.state.project.map(function (object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div className="container" style={{marginTop: 100}}>
        <div>
          <h3 align="center">Projetos</h3>
          <p className="grey-text text-darken-1">
            <Link to="/dashboard">Voltar</Link> <br></br>
            <Link to="/createProject"> Propor Projeto</Link>
          </p>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Título</th>
                <th>Data</th>
                <th>Descrição</th>
                <th colSpan="2">Action</th>
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