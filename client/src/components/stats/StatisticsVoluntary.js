import React, { Component } from 'react';
import axios from 'axios';
import TableRowP from './TableRowVoluntaryStatsProjects';
import TableRowCP from './TableRowVoluntaryStatsConcludedProjects';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class StatisticsNumberProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            concludedProjects: []
        };
    }
    componentDidMount() {
        axios.get('/api/stats/getVoluntaryStatsData/' + this.props.auth.user.id)
            .then(response => {
                this.setState({
                    projects: response.data[0],
                    concludedProjects: response.data[1]
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRowP() {
        return this.state.projects.map(function (object, i) {
            return <TableRowP obj={object} key={i} />;
        });
    }

    tabRowCP() {
        return this.state.concludedProjects.map(function (object, i) {
            return <TableRowCP obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <h3 className="center"><b>Meus Projetos</b></h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Projeto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRowP()}
                        {this.tabRowCP()}
                    </tbody>
                </table>
            </div>
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