import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.myDate = new Date(props.obj.date);
    this.myDate = this.myDate.toLocaleDateString();
  }

  delete() {
    axios.get('/api/projects/deleteProject/' + this.props.obj._id)
      .then(console.log('Deleted'))
      .catch(err => console.log(err))
    window.location.reload();
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.title}
        </td>
        <td>
          {this.myDate}
        </td>
        <td>
          {this.props.obj.description}
        </td>
        <td>
          <Link to={"/getProject/" + this.props.obj._id} className="btn btn-primary" style={{ width: "15%", backgroundColor: "#D6E6F2", color: "black" }}><i className="material-icons">search</i></Link>
          <Link to={"/editProject/" + this.props.obj._id} className="btn btn-primary" style={{ width: "15%", backgroundColor: "lightGrey", color: "black", marginLeft: 40 }}><i className="material-icons">edit</i></Link>
          <button onClick={this.delete} className="btn btn-danger" style={{ width: "15%", backgroundColor: "red", marginLeft: 40, color: "black" }}><i className="material-icons">delete</i></button>
        </td>
      </tr>
    );
  }
}

export default TableRow;