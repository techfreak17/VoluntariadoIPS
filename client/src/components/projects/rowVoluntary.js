import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class RowVoluntary extends Component {

  render() {
    return (
        <tr>
          {this.props.obj.name}
          <Link to={"/getUser/" + this.props.obj.userID}
              className="btn btn-large waves-effect waves-light hoverable black center">Ver Voluntários</Link>
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
