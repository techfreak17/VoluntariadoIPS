import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class TableRowVoluntaryRole extends Component {

    constructor(props) {
        super(props);
        this.number = this.props.number;
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    Voluntário
                </td>
            </tr>
        );
    }
}

TableRowVoluntaryRole.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(TableRowVoluntaryRole);
