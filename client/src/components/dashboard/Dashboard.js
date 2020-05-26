import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css";
import options from "materialize-css";
import axios from 'axios';
import ProjectsRow from "../layout/ProjectsRow"


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { project: [{ title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" }, { title: "", description: "" }] };
        axios.get('/api/projects/listProjects')
            .then(response => {
                this.setState({ project: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, options);
            console.log(instances);
        });

        //const { user } = this.props.auth;
        let projectL = [];

        const projectList = () => {
            for (let i = 0; i < this.state.project.length; i++) {
                projectL.push(<ProjectsRow obj={this.state.project[i]} key={i} className="caption left-align" />);
            }
            return projectL;
          };

        return (
            <div className="container-fluid" style={{ width: "100%" }}>
                <div className="container" style={{ width: "65%", backgroundColor: "#23395D", borderRadius: 50, marginTop: 20, boxShadow: "0 0 10px 2px green", marginBottom: 30}}>
                    <div className="section">
                        <h2 className="header center text-lighten-2" style={{ fontFamily: "monospace", fontWeight: "bold", color: "#50C878" }}>Plataforma VoluntariadoIPS</h2>
                        <div className="row center" style={{ width: "100%", textLighten: 2, fontWeight: "bold", color: "white" }}>
                            <h5 className="header col s12 " ><b>Página Principal</b></h5>
                        </div>
                    </div>
                </div>

                <div className="slider">
                    <ul className="slides">
                        {projectList()}
                    </ul>
                </div>
                <div className="container-fluid">
                <div className="container">
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <a className="navbar-brand" href="https://moodle.ips.pt/1920/"><img src={require('../layout/images/MOODLE.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive" style={{ position: "absolute", left: 0, height: "auto", width: "auto", paddingLeft:250, paddingBottom: 30}}/></a>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <a className="navbar-brand" href="http://aaips.pt/"><img src={require('../layout/images/AAIPS.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive" style={{ position: "absolute", left: 0, height: "auto", width: "auto", paddingLeft:550, paddingTop: 70, paddingBottom: 30}}/></a>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <a className="navbar-brand" href="https://www.ips.pt/ips_si/web_page.inicial"><img src={require('../layout/images/IPS.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive" style={{ position: "absolute", left: 0, height: "auto", width: "auto", paddingLeft:900, paddingTop: 70, paddingBottom: 30}}/></a>
                            </div>
                        </div>
                    </div>
            </div>
            </div >
        );
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);