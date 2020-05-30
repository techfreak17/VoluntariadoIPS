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
          <Link to={"/getProject/" + this.props.obj._id} className="btn btn-primary" style={{backgroundColor: "#B9BBB6"}}><i className="material-icons" style={{ color: "black" }}>search</i></Link>
        </td>
        <td>
          <Link to={"/editProject/" + this.props.obj._id} className="btn btn-primary" style={{backgroundColor: "#B9BBB6", color: "black"}}><i className="material-icons" style={{ color: "black" }}>edit</i></Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger" style={{backgroundColor: "#B9BBB6"}}><i className="material-icons" style={{ color: "black" }}>delete</i></button>
        </td>
      </tr>
    );
  }
}

export default TableRow;