import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRowUsers extends Component {

    constructor(props) {
          super(props);
          this.delete = this.delete.bind(this);
      }
      delete() {
          axios.get('/api/admin/deleteUser/' + this.props.obj._id)
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
              <Link to={"/getUser/" + this.props.obj._id} className="btn btn-primary" style={{width: "15%", backgroundColor: "#D6E6F2", color: "black"}}><i className="material-icons">search</i></Link>
              <Link to={"/editUser/" + this.props.obj._id} className="btn btn-primary" style={{width: "15%", backgroundColor: "lightGrey", color: "black", marginLeft: 40 }}><i className="material-icons">edit</i></Link>
              <button onClick={this.delete} className="btn btn-danger" style={{width: "15%", backgroundColor: "red", color: "black", marginLeft: 40}}><i className="material-icons">delete</i></button>
            </td>
          </tr>
      );
    }
  }
  
  export default TableRowUsers;