import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
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
            {this.props.obj.date}
          </td>
          <td>
            {this.props.obj.description}
          </td>
          <td>
            <Link to={"/editProject/" + this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;