import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import Chart from 'react-apexcharts'

class StatisticsProjectComparison extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countProjects: 0,
            countConcluded: 0,
            countSubmited: 0,
            options: {
                labels: ['Projectos', 'Concluidos', 'Submetidos'],
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
        })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <h3 className="center"><b>Projectos</b></h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Projectos a Decorrer</th>
                            <th>Projectos Concluidos</th>
                            <th>Projectos Submetidos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.countProjects}</td>
                            <td>{this.state.countConcluded}</td>
                            <td>{this.state.countSubmited}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <Chart options={this.state.options} series={this.state.options.series} type="donut" width="380" />
                </div>
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