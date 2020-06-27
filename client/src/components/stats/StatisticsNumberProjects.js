import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRowProjects';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class StatisticsNumberProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }
    componentDidMount() {
        axios.get('/api/projects/listProjects')
            .then(response => {
                this.setState({
                    projects: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow() {
        return this.state.projects.map(function (object, i) {
            let array = [...object.enroled_IDs];
            let lenght = array.length;
            return <TableRow title={object.title} number={lenght} key={i} />;
        });
    }

    render() {
        return (
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Nº Voluntários</th>
                    </tr>
                </thead>
                <tbody>
                    {this.tabRow()}
                </tbody>
            </table>
        );
    }
}

StatisticsNumberProjects.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(StatisticsNumberProjects);