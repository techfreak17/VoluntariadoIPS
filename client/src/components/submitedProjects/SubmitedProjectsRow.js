import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class SubmitedProjectsRow extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.accept = this.accept.bind(this);
    this.myDate = new Date(props.obj.date);
    this.myDate = this.myDate.toLocaleDateString();
  }

  delete() {
    axios.get('/api/submitedProjects/submitDeleteProject/' + this.props.obj._id)
      .then(console.log('Deleted'))
      .catch(err => console.log(err))
    window.location.reload();
  }

  accept() {
    axios.post("/api/submitedProjects/acceptSubmitedProject/" + this.props.obj._id)
        .then(console.log('Accepted'))
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
          {this.props.obj.synopsis}
        </td>
        <td>
          {this.myDate}
        </td>
        <td>
          <Link to={"/getSubmitedProject/" + this.props.obj._id} className="btn btn-primary" style={{ width: "15%", backgroundColor: "#D6E6F2", color: "black" }}><i className="material-icons">search</i></Link>
          <button onClick={this.accept} className="btn btn-danger" style={{ width: "15%", backgroundColor: "green", color: "white", marginLeft: 40 }}><i className="material-icons">done</i></button>
          <button onClick={this.delete} className="btn btn-danger" style={{ width: "15%", backgroundColor: "red", marginLeft: 40, color: "white" }}><i className="material-icons">close</i></button>
        </td>
      </tr>
    );
  }
}

SubmitedProjectsRow.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(SubmitedProjectsRow);