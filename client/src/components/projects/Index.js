import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import { Link } from "react-router-dom";

export default class Index extends Component {

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
  onChangeSearch(e){
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
    axios.post("/api/projects/searchProject",obj)
    .then(response => {
      this.setState({ project: response.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  reload(){
    window.location.reload();
  }

  render() {
    return (
      <div className="container" style={{marginTop: "5%", paddingBottom: 70}}>
        <div>
          <h3 align="center">Projetos</h3>
          <p className="grey-text text-darken-1">
            <a href="/dashboard" onClick={this.reload()}>Voltar</a> <br></br>
            <Link to="/createProject"> Propor Projeto</Link>
          </p>
          <form onSubmit={this.onSubmit}>
            <input id="myInput" type="text" placeholder="Search..." name="search" onChange={this.onChangeSearch}></input>
            <button type="submit">Pesquisar</button>
          </form>
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
