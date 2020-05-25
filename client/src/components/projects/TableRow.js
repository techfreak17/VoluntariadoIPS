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
          <Link to={"/getProject/" + this.props.obj._id} className="btn btn-primary" style={{backgroundColor: "#03C04A"}}>Ver</Link>
        </td>
        <td>
          <Link to={"/editProject/" + this.props.obj._id} className="btn btn-primary" style={{backgroundColor: "lightBlue", color: "black"}}>Editar</Link>
        </td>
        <td>
          <button onClick={this.delete} className="btn btn-danger" style={{backgroundColor: "#9B1003"}}>Apagar</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;