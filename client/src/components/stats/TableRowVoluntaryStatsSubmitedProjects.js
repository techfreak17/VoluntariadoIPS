import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class TableRowVoluntaryStatsSubmitedProjects extends Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.title}
                </td>
                <td>
                    Submetido
                </td>
            </tr>
        );
    }
}

TableRowVoluntaryStatsSubmitedProjects.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(TableRowVoluntaryStatsSubmitedProjects);