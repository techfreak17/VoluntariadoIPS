import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import TableRow from './TableRowStats';

class StatisticsRatingProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }
    componentDidMount() {
        axios.get('/api/stats/listProjectsClassifications')
            .then(response => {
                console.log(response.data)
                this.setState({
                    projects: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(this.state.projects);
    }

    tabRow() {
        return this.state.projects.map(function (object, i) {
            return <TableRow obj={object} key={i} />
        });
    }

    render() {
        return (
            <div className="container">
                <h3 className="center"><b>Classificação dos Projetos</b></h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Projeto</th>
                            <th>Classificação Média</th>
                            <th>Número Votos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}

StatisticsRatingProjects.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(StatisticsRatingProjects);