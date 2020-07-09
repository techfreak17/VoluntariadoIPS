import React, { Component } from "react";
import axios from 'axios';
import ProjectsRow from "./ProjectsRow"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css";
import options from "materialize-css";
import "../../componentsCSS/Landing.css"


class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [{ title: "", date: "", synopsis: "" }, { title: "", date: "", synopsis: "" }, { title: "", date: "", synopsis: "" }],
        };
    }

    componentDidMount() {
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
        if (user.id !== undefined) {
            window.location.replace("http://localhost:3000/dashboard");
        }
    }

    render() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            M.Slider.init(elems, options);
        });

        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.parallax');
            M.Parallax.init(elems, options);
        });

        let projectL = [];

        const projectList = () => {
            for (let i = 0; i < this.state.project.length; i++) {
                projectL.push(<ProjectsRow obj={this.state.project[i]} key={i} className="caption left-align" />);
            }
            return projectL;
        };

        return (
            <div>
                <div className="parallax-container" style={{ marginBottom: "-30px" }}>
                    <div className="parallax"><img src={require('../layout/images/background.jpg')} alt="(Não esquecer de verificar no spam)" className="img-responsive" /></div>
                </div>
                <div>
                    <div style={{ width: "80%", margin: "auto" }}>
                        <div className="container-fluid" style={{ marginTop: 50, marginBottom: 20, backgroundColor: "white", padding: 30, borderRadius: 50, boxShadow: "0 0 10px 10px #23395D" }}>
                            <div className="slider">
                                <ul className="slides">
                                    {projectList()}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{ width: "60%", backgroundColor: "#23395D", borderRadius: 50, marginTop: 25, marginBottom: 30 }}>
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
                            <div className="botoes row center" style={{display: "flex", justifyContent: "center"}}>
                                    <a href="/registerCompany"
                                        style={{
                                            borderRadius: 10,
                                            fontWeight: "bold"
                                        }}
                                        className="botao btn-large hoverable green">
                                        Empresa
                                        </a>
                                        <div style={{margin: 10}}> </div>
                                    <a href="/registerVoluntary"
                                        style={{
                                            borderRadius: 10,
                                            fontWeight: "bold"
                                        }}
                                        className="botao btn-large hoverable green">
                                        Voluntário</a> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="parallax-container">
                    <div className="parallax"><img src={require('../layout/images/background.jpg')} alt="(Não esquecer de verificar no spam)" className="img-responsive" /></div>
                </div>

                <div className="container" style={{ marginBottom: 20, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    <a className="img" href="https://moodle.ips.pt/1920/" rel="noopener noreferrer" target="_blank" >
                        <img src={require('../layout/images/MOODLE.png')}
                            alt="Moodle" />
                    </a>
                    <a className="img" href="http://aaips.pt/" rel="noopener noreferrer" target="_blank">
                        <img src={require('../layout/images/AAIPS.png')}
                            alt="AAIPS" />
                    </a>
                    <a className="img" href="https://www.ips.pt/ips_si/web_page.inicial" rel="noopener noreferrer" target="_blank" >
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