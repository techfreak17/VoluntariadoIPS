import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
    render() {
        return (
            <div className="container-fluid" style={{ width: "100%" }}>
                <div className="parallax-container valign-wrapper" style={{ width: "100%", minHeight: 380, lineHeight: 0, color: "white", height: 400, position: "relative", overflow: "hidden" }}>
                    <div className="section no-pad-bot" style={{ width: "100%" }}>
                        <div className="container">
                            <h1 className="header center teal-text text-lighten-2">Bem-vindo à plataforma {" "}
                                <span style={{ fontFamily: "monospace" }}>VoluntariadoIPS</span></h1>
                            <div className="row center" style={{ width: "50%" }}>
                                <h5 className="header col s12 light">Pronto para ajudar?
                            <p className="flow-text text-darken-1">
                                        Junte-se a nós em diversos projetos que são
                                        enriquecedores tanto para si como para a comunidade!
                            </p></h5>
                            </div>
                            <div className="row center" style={{ width: "50%" }}>
                                <div className="col s6">
                                    <Link
                                        to="/register"
                                        style={{
                                            width: "140px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginLeft: "40%"
                                        }}
                                        className="btn btn-large waves-effect waves-light hoverable green">
                                        Registar
                                </Link>
                                </div>
                                <div className="col s6">
                                    <Link
                                        to="/login"
                                        style={{
                                            width: "140px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginRight: "40%"
                                        }}
                                        className="btn btn-large waves-effect waves-light hoverable blue">
                                        Log In
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{
                        position: "absolute",
                        top: -100,
                        left: 900,
                        zIndex: -1,
                        transform: "translate(-50%)"
                    }}>
                        <img src={require("./images/background1.jpg")} alt="Unsplashed background img 1"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;