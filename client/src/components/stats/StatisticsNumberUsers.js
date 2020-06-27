import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import Chart from 'react-apexcharts'

class StatisticsNumberUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countVoluntary: 0,
            countCompany: 0,
            countAdmin: 0,
            options: {
                labels: ['Voluntário', 'Empresa', 'Administrador'],
                series: []
            },
        }
    }

    componentDidMount() {
        axios.get('/api/stats/countUsers').then(response => {
            this.setState(prevState => ({
                options: { series: [...prevState.options.series, ...response.data] },
                countVoluntary: response.data[0],
                countCompany: response.data[1],
                countAdmin: response.data[2],
            }));
        })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container">
                <h3 className="center"><b>Utilizadores</b></h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nº Voluntários</th>
                            <th>Nº Empresas</th>
                            <th>Nº Administradores</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.countVoluntary}</td>
                            <td>{this.state.countCompany}</td>
                            <td>{this.state.countAdmin}</td>
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

StatisticsNumberUsers.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(StatisticsNumberUsers);