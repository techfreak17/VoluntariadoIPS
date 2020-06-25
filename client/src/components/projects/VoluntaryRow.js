import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';

class VoluntaryRow extends Component {

  constructor(props) {
    super(props);
    this.removeVoluntary = this.removeVoluntary.bind(this);
  }

  removeVoluntary() {
    const newObj = {
      projectID: this.props.project,
    };
    axios.post('/api/projects/removeVoluntary/' + this.props.obj._id, newObj)
      .catch(err => console.log(err))
    window.location.reload();
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          <Link to={"/getUser/" + this.props.obj.userID} className="btn btn-primary" style={{ width: "auto", backgroundColor: "lightGrey", color: "black", marginLeft: 40 }}><i className="material-icons">search</i></Link>
          {(() => {
            if (this.props.auth.user.role === "Administrador") {
              return (
                <button onClick={this.removeVoluntary} className="btn btn-danger" style={{ width: "auto", backgroundColor: "red", marginLeft: 40, color: "white" }}><i className="material-icons">remove</i></button>
              )
            }
          })()}
        </td>
      </tr>

    );
  }
}

VoluntaryRow.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { VoluntaryRow }
)(VoluntaryRow);