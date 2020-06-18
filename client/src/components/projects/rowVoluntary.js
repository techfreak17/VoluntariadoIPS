import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class RowVoluntary extends Component {

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          <button onClick={this.props.history.push('/getUser/'+this.props.obj.userID)} className="btn btn-danger" style={{ width: "auto", backgroundColor: "green", marginLeft: 40, color: "white" }}><i className="material-icons">Ver Utilizador</i></button>
        </td>
      </tr>
    );
  }
}

RowVoluntary.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { RowVoluntary }
)(RowVoluntary);
