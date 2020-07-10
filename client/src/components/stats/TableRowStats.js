import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class TableRowStats extends Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td style={{ display: "flex", alignItems: "center"}}>
                    {this.props.obj.avgRating} <i className="material-icons" style={{color: "#D4AF37"}} >star</i>
                </td>
                <td>
                    {this.props.obj.numberVotes}
                </td>
            </tr>
        );
    }
}

TableRowStats.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(TableRowStats);
