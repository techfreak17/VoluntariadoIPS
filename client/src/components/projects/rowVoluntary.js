import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class RowVoluntary extends Component {

  render() {
    return (
        <tr>
          
          <a href={"/getUser/" + this.props.obj.userID} style={{fontSize: "20px", color:"black"}}
              className="hoverable  center">{this.props.obj.name}</a>
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
