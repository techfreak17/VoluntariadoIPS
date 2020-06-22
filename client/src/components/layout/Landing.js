import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import ProjectsRow from "./ProjectsRow"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css";
import options from "materialize-css";

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [{ title: "", date: "", synopsis: "" }, { title: "", date: "", synopsis: "" }, { title: "", date: "", synopsis: "" }],
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
            window.location.reload();
        }else{
        if (window.localStorage) {
            if (!localStorage.getItem('firstLoad')) {
                localStorage['firstLoad'] = true;
                window.location.reload();
            }
            else
                localStorage.removeItem('firstLoad');
        }
        axios.get('/api/projects/listProjects')
            .then(response => {
                this.setState({ project: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        const { user } = this.props.auth;
        if(user.id !== undefined){
            window.location.replace("http://localhost:3000/dashboard");
        }
    }}

    render() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            M.Slider.init(elems, options);
        });
        let projectL = [];

        const projectList = () => {
            for (let i = 0; i < this.state.project.length; i++) {
                projectL.push(<ProjectsRow obj={this.state.project[i]} key={i} className="caption left-align" />);
            }
            return projectL;
        };

        return (
            <div className="container-fluid" style={{ width: "100%" }}>
                <div className="slider">
                    <ul className="slides">
                        {projectList()}
                    </ul>
                </div>

                <div className="container" style={{ width: "60%", backgroundColor: "#23395D", borderRadius: 50, marginTop: 25, marginBottom: 30, boxShadow: "0 0 15px 3px green" }}>
                    <div className="section">
                        <h2 className="header center text-lighten-2" style={{ fontFamily: "monospace", fontWeight: "bold", color: "#50C878" }}>Plataforma {" "}
                            <span>VoluntariadoIPS</span></h2>
                        <div className="row center" style={{ width: "100%", textLighten: 2, fontWeight: "bold", color: "#FEF4E8" }}>
                            <h5 className="header col s12 " >Pronto para ajudar ?
                        <p className="flow-text text-darken-1">
                                    Junte-se a nós em diversos projetos
                                    enriquecedores para si e para a comunidade IPS.
                        </p></h5>
                            <h5 style={{ color: "#FEF4E8", fontWeight: "bold" }}>REGISTE-SE</h5>
                        </div>
                        <div className="row center" style={{ width: "40%" }}>
                            <div className="col s6">
                                <Link
                                    to="/registerCompany"
                                    style={{
                                        width: "140px",
                                        borderRadius: 10,
                                        letterSpacing: "1.5px",
                                        fontWeight: "bold"
                                    }}
                                    className="btn btn-large waves-effect waves-light hoverable green">
                                    Empresa
                                </Link>
                            </div>
                            <div className="col s6">
                                <a href="/registerVoluntary"
                                    style={{
                                        width: "170px",
                                        borderRadius: 10,
                                        letterSpacing: "1.5px",
                                        fontWeight: "bold"
                                    }}
                                    className="btn btn-large waves-effect waves-light hoverable green">
                                    Voluntário</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container" style={{ marginBottom: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <a className="img" href="https://moodle.ips.pt/1920/" rel="noopener noreferrer" target="_blank" style={{ paddingRight: 100 }}>
                        <img src={require('../layout/images/MOODLE.png')}
                            alt="Moodle" />
                    </a>
                    <a className="img" href="http://aaips.pt/" rel="noopener noreferrer" target="_blank">
                        <img src={require('../layout/images/AAIPS.png')}
                            alt="AAIPS" />
                    </a>
                    <a className="img" href="https://www.ips.pt/ips_si/web_page.inicial" rel="noopener noreferrer" target="_blank" style={{ paddingLeft: 100 }}>
                        <img src={require('../layout/images/IPS.png')}
                            alt="IPS" />
                    </a>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Landing);
