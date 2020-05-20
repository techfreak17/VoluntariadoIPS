import React, { Component } from 'react';
import axios from 'axios';
import TableRowUsers from './TableRowUsers';
import { Link } from "react-router-dom";

export default class IndexUsers extends Component {

  constructor(props) {
      super(props);
      this.state = {user: []};
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
    
    tabRow(){
      return this.state.user.map(function(object, i){
          return <TableRowUsers obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Utilizadores</h3>
          <p className="grey-text text-darken-1">
              <Link to="/dashboard">Voltar</Link> <br></br>
              <Link to="/createUser"> Criar Utilizador</Link>
          </p>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Número</th>
                <th>Nome</th>
                <th>Email</th>
                <th colSpan="2">Action</th>
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