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
    componentDidMount(){
      axios.get('/api/users/listUsers')
        .then(response => {
          this.setState({ user: response.data});
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
    
    tabRow(){
      return this.state.user.map(function(object, i){
          return <TableRowUsers obj={object} key={i} />;
      });
    }

    onSubmit(e) {
      e.preventDefault();
      const obj = {
        search: document.getElementById("myInput").value,
      };
      axios.post("/api/users/searchUser",obj)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
      
    }

    render() {
      return (
        <div className="container" style={{marginTop: "5%", paddingBottom: 70}}>
          <h3 align="center">Utilizadores</h3>
          <p className="grey-text text-darken-1">
             <a href="/dashboard" onClick="window.location.reload()">Voltar</a> <br></br>
              <Link to="/createUser"> Criar Utilizador</Link>
          </p>
          <form onSubmit={this.onSubmit}>
            <input id="myInput" type="text" placeholder="Search.." name="search" onChange={this.onChangeSearch}></input>
            <button type="submit">Pesquisar</button>
          </form>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Papel</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }