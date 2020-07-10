import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class TableRowAdminRole extends Component {

    constructor(props) {
        super(props);
        this.number = this.props.number;
        console.log(this.props.obj)
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    Admin
                </td>
            </tr>
        );
    }
}

TableRowAdminRole.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(TableRowAdminRole);