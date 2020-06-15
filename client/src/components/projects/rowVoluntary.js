import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';

class rowVoluntary extends Component {

  constructor(props) {
    super(props);
  }

viewUser(){

}

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          <button onClick={this.viewUser} className="btn btn-danger" style={{ width: "auto", backgroundColor: "green", marginLeft: 40, color: "white" }}><i className="material-icons">Ver Utilizador</i></button>
        </td>
      </tr>
    );
  }
}

rowVoluntary.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { rowVoluntary }
)(rowVoluntary);
