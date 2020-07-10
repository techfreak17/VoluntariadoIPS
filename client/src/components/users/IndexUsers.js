import React, { Component } from 'react';
import axios from 'axios';
import TableRowUsers from './TableRowUsers';
import { Link } from "react-router-dom";

export default class IndexUsers extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      user: [],
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
    axios.get('/api/users/listUsers')
      .then(response => {
        this.setState({ user: response.data });
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
    return this.state.user.map(function (object, i) {
      return <TableRowUsers obj={object} key={i} />;
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      search: document.getElementById("myInput").value,
    };
    axios.post("/api/users/searchUser", obj)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="container" style={{ paddingBottom: 70 }}>
        <h1 align="center"><b>Utilizadores</b></h1>
        <p className="grey-text text-darken-1">
          <a href="/dashboard" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i>
                      Voltar
          </a>
          <Link to="/createVoluntaryUser" className="right btn waves-effect waves-light hoverable"
            style={{
              borderRadius: 5,
              letterSpacing: "1px",
              backgroundColor: "#23395D",
              margin: 10
            }}> Criar Voluntário</Link>

          <Link to="/createCompanyUser" className="right btn waves-effect waves-light hoverable"
            style={{
              borderRadius: 5,
              letterSpacing: "1px",
              backgroundColor: "#23395D",
              margin: 10
            }}> Criar Empresa</Link>
        </p>
        <form onSubmit={this.onSubmit}>
          <input id="myInput" type="text" placeholder="Pesquisar por username ..." name="search" onChange={this.onChangeSearch} style={{ borderBottom: "3px solid #23395D" }}></input>
          <button type="submit" className="btn waves-effect waves-light hoverable" style={{ backgroundColor: "#DDDDDD", color: "black", height: 35, fontWeight:"bolder" }}>Pesquisar</button>
        </form>
        <table className="responsive-table" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Papel</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {this.tabRow()}
          </tbody>
        </table>
      </div>
    );
  }
}