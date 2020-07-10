import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import Chart from 'react-apexcharts';
import "../../componentsCSS/Stats.css";
import TableRowP from './TableRowVoluntaryStatsProjects';
import TableRowCP from './TableRowVoluntaryStatsConcludedProjects';
import TableRowSP from './TableRowVoluntaryStatsSubmitedProjects';

class StatisticsProjectComparison extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countProjects: 0,
            countConcluded: 0,
            countSubmited: 0,
            projects: [],
            concludedProjects: [],
            submitedProjects: [],
            options: {
                labels: ['A Decorrer', 'Concluidos', 'Submetidos'],
                series: []
            },
        }
    }

    componentDidMount() {
        axios.get('/api/stats/countProjects').then(response => {
            this.setState(prevState => ({
                options: { series: [...prevState.options.series, ...response.data] },
                countProjects: response.data[0],
                countConcluded: response.data[1],
                countSubmited: response.data[2],
            }));
        }).catch(error => console.log(error));
        
        axios.get('/api/stats/getAllProjects')
            .then(response => {
                console.log(response);
                this.setState({
                    projects: response.data[0],
                    concludedProjects: response.data[1],
                    submitedProjects: response.data[2]
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

    tabRowSP() {
        return this.state.submitedProjects.map(function (object, i) {
            return <TableRowSP obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <h3 className="center"><b>Lista dos Projetos</b></h3>
                <div className="chart" style={{ display: "flex", justifyContent: "center" }}>
                    <Chart options={this.state.options} series={this.state.options.series} type="donut" width="165%" />
                </div>
                <table className="table table-striped" style={{ marginTop: 20, marginBottom: 60}}>
                    <thead>
                        <tr>
                            <th>Projeto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRowP()}
                        {this.tabRowCP()}
                        {this.tabRowSP()}
                    </tbody>
                </table>
            </div>
        );
    }
}

StatisticsProjectComparison.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(StatisticsProjectComparison);