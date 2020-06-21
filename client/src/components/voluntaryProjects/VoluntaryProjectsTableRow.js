import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class VoluntaryProjectsTableRow extends Component {

  constructor(props) {
    super(props);
    this.myDate = new Date(props.obj.date);
    this.myDate = this.myDate.toLocaleDateString();
    this.unjoinProject = this.unjoinProject.bind(this);
  }

  unjoinProject() {
    const newObj = {
      userID: this.props.auth.user.id,
    };
    axios.post('/api/voluntaries/unjoinProject/' + this.props.obj._id, newObj)
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
          {this.props.obj.synopsis}
        </td>
        <td>
          <Link to={"/getVoluntaryProjects/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "#D6E6F2", color: "black" }}><i className="material-icons">search</i></Link>
          <button onClick={this.unjoinProject} className="btn btn-danger" style={{ width: "auto", backgroundColor: "red", marginLeft: 40, color: "white" }}><i className="material-icons">close</i></button>
        </td>
      </tr>
    );
  }
}

VoluntaryProjectsTableRow.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(VoluntaryProjectsTableRow);
