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
          <Link to={"/getUser/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "#D6E6F2", color: "black" }}><i className="material-icons">search</i></Link>
          {(() => {
            if (this.props.obj.role === "Voluntário") {
              return (
                <Link to={"/editVoluntary/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "lightGrey", color: "black", marginLeft: 40 }}><i className="material-icons">edit</i></Link>
              )
            }
          })()}
          {(() => {
            if (this.props.obj.role === "Empresa") {
              return (
                <Link to={"/editCompany/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "lightGrey", color: "black", marginLeft: 40 }}><i className="material-icons">edit</i></Link>
              )
            }
          })()}
          {(() => {
            if (this.props.obj.role !== "Administrador") {
              return (
                <button onClick={this.delete} className="btn btn-danger" style={{ width: "auto", backgroundColor: "red", color: "black", marginLeft: 40 }}><i className="material-icons">delete</i></button>
              )
            }
          })()}
         
        </td>
      </tr>
    );
  }
}

export default TableRowUsers;