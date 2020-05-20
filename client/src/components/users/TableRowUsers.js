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
              {this.props.obj.number}
            </td>
            <td>
              {this.props.obj.name}
            </td>
            <td>
              {this.props.obj.email}
            </td>
            <td>
              <Link to={"/editUser/" + this.props.obj._id} className="btn btn-primary">Edit</Link>
            </td>
            <td>
              <button onClick={this.delete} className="btn btn-danger">Delete</button>
            </td>
          </tr>
      );
    }
  }
  
  export default TableRowUsers;