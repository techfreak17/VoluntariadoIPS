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
              <Link to={"/getUser/" + this.props.obj._id} className="btn btn-primary" style={{backgroundColor: "#B9BBB6"}}><i className="material-icons" style={{ color: "black" }}>search</i></Link>
           </td>
            <td>
              <Link to={"/editUser/" + this.props.obj._id} className="btn btn-primary" style={{backgroundColor: "#B9BBB6", color: "black"}}><i className="material-icons" style={{ color: "black" }}>edit</i></Link>
            </td>
            <td>
              <button onClick={this.delete} className="btn btn-danger" style={{backgroundColor: "#B9BBB6"}}><i className="material-icons" style={{ color: "black" }}>delete</i></button>
            </td>
          </tr>
      );
    }
  }
  
  export default TableRowUsers;