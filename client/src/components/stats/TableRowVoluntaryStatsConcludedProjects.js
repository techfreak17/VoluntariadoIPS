import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class TableRowVoluntaryStatsConcludedProjects extends Component {

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.title}
                </td>
                <td>
                    Concluído
                </td>
            </tr>
        );
    }
}

TableRowVoluntaryStatsConcludedProjects.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(TableRowVoluntaryStatsConcludedProjects);