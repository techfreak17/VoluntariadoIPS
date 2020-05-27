import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import options from "materialize-css";
import axios from 'axios';
import ProjectsRow from "./ProjectsRow"



class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = { project: [{ title: "", date: "" }, { title: "", date: "" }, { title: "", date: "desricao" }, { title: "", date: "" }] };
        axios.get('/api/projects/listProjects')
            .then(response => {
                this.setState({ project: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    render() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, options);
            console.log(instances);
        });

        let projectL = [];

        const projectList = () => {
            for (let i = 0; i < this.state.project.length; i++) {
                projectL.push(<ProjectsRow obj={this.state.project[i]} key={i} className="caption left-align" />);
            }
            return projectL;
          };

        return (
            <div className="container-fluid" style={{ width: "100%"}}>
            <div className="slider">
                <ul className="slides">
                    {projectList()}
                </ul>
            </div>
            <div className="container" style={{ width: "65%", backgroundColor: "#23395D", borderRadius: 50, marginTop: 15, boxShadow: "0 0 10px 2px green" }}>
                <div className="section">
                    <h2 className="header center text-lighten-2" style={{ fontFamily: "monospace", fontWeight: "bold", color: "#50C878" }}>Plataforma {" "}
                        <span>VoluntariadoIPS</span></h2>
                    <div className="row center" style={{ width: "100%", textLighten: 2, fontWeight: "bold", color: "white" }}>
                        <h5 className="header col s12 " >Pronto para ajudar ?
                        <p className="flow-text text-darken-1">
                                Junte-se a nós em diversos projetos 
                                enriquecedores para si e para a comunidade IPS.
                        </p></h5>
                        <h4 style={{color:"#E1C699"}}>Registe-se</h4>
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
                            <Link
                                to="/registerVoluntary"
                                style={{
                                    width: "170px",
                                    borderRadius: 10,
                                    letterSpacing: "1.5px",
                                    fontWeight: "bold"
                                    
                                }}
                                className="btn btn-large waves-effect waves-light hoverable green">
                                Voluntário
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center brown-text"><img src={require('./images/MOODLE.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive" style={{ position: "absolute", left: 0, height: 150, width: "auto", paddingLeft:300}}/></h2>
                            </div>
                        </div>
                        <div className="col s12 m4" >
                            <div className="icon-block">
                            <h2 className="center brown-text"><img src={require('./images/AAIPS.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive" style={{ position: "absolute", left: 0, height: 150, width: "auto", paddingLeft:600, paddingTop: 40}}/></h2>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <div className="icon-block">
                            <h2 className="center brown-text"><img src={require('./images/IPS.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive" style={{ position: "absolute", left: 0, height: 150, width: "auto", paddingLeft:950, paddingTop: 40}}/></h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default Landing;