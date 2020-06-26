import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import Chart from 'react-apexcharts'

class StatisticsUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            countVoluntary: 2,
            countCompany: 2,
            countAdmin: 2,
            options: {
                labels: ['Voluntário', 'Empresa', 'Administrador'],
                series: []
            },
        }
    }

    componentDidMount() {
        axios.get('/api/stats/countUsers').then(response => {
            console.log(response.data);
            this.setState(prevState =>({
                options:{series:[...prevState.options.series, ...response.data]}
            }));
        })
            .catch(error => console.log(error));
    }

    /*changeSeries = () =>{
        let newSeries = [];
        newSeries.push(this.state.countVoluntary);
        newSeries.push(this.state.countCompany);
        newSeries.push(this.state.countAdmin);
    
        this.setState({
            series : newSeries
        })
    }*/

    render() {
        /* eslint-disable */
        //this.state.series = newSeries;

        console.log(this.state.options.series)
       
        return (
            <div>
                <Chart options={this.state.options} series={this.state.options.series} type="donut" width="380" />
            </div>
        );
    }
}

StatisticsUser.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(StatisticsUser);