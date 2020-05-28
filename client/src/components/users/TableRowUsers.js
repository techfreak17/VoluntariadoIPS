import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRowUsers extends Component {

    constructor(props) {
          super(props);
          this.delete = this.delete.bind(this);
      }
      delete() {
          axios.get('/api/users/deleteUser/' + this.props.obj._id)
              .then(console.log('Deleted'))
              .catch(err => console.log(err))
          window.location.reload();
      }
    render() {
      return (
          <tr>
            <td>
              {this.props.obj.username}
            </td>
            <td>
              {this.props.obj.email}
            </td>
            <td>
              {this.props.obj.role}
            </td>
            <td>
              <Link to={"/getUser/" + this.props.obj._id} className="btn btn-primary" style={{backgroundColor: "#03C04A"}}>Ver</Link>
           </td>
            <td>
              <Link to={"/editUser/" + this.props.obj._id} className="btn btn-primary" style={{backgroundColor: "lightBlue", color: "black"}}>Editar</Link>
            </td>
            <td>
              <button onClick={this.delete} className="btn btn-danger" style={{backgroundColor: "#9B1003"}}>Apagar</button>
            </td>
          </tr>
      );
    }
  }
  
  export default TableRowUsers;