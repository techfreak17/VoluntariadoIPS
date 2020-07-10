import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import Chart from 'react-apexcharts';
import "../../componentsCSS/Stats.css";
import TableRowV from './TableRowVoluntaryRole';
import TableRowC from './TableRowCompanyRole';
import TableRowA from './TableRowAdminRole';

class StatisticsNumberUsers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countVoluntary: 0,
            countCompany: 0,
            countAdmin: 0,
            voluntaries: [],
            companies: [],
            admin: [],
            options: {
                labels: ['Voluntário', 'Empresa', 'Administrador'],
                series: []
            }
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
        }).catch(error => console.log(error));

        axios.get('/api/stats/getUsersInfo')
            .then(response => {
                this.setState({
                    voluntaries: response.data[0],
                    companies: response.data[1],
                    admin: response.data[2]
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    TableRowV() {
        return this.state.voluntaries.map(function (object, i) {
            return <TableRowV obj={object} key={i} />;
        });
    }

    TableRowC() {
        return this.state.companies.map(function (object, i) {
            return <TableRowC obj={object} key={i} />;
        });
    }

    TableRowA() {
        return this.state.admin.map(function (object, i) {
            return <TableRowA obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <h3 className="center"><b>Número de Utilizadores</b></h3>
                <div className="chart" style={{ display: "flex", justifyContent: "center" }}>
                    <Chart options={this.state.options} series={this.state.options.series} type="donut" width="165%" />
                </div>
                <table className="table table-striped" style={{ marginTop: 20, marginBottom: 80 }}>
                    <thead>
                        <tr>
                            <th>Utilizador</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.TableRowV()}
                        {this.TableRowC()}
                        {this.TableRowA()}
                    </tbody>
                </table>
            </div >
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