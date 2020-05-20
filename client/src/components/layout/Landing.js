import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
    render() {
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            Bem-vindo à plataforma {" "}
                            <span style={{ fontFamily: "monospace" }}>VoluntariadoIPS</span>
                            .
                        </h4>
                        <h5>
                            Pronto para ajudar?
                        </h5>
                        <p className="flow-text grey-text text-darken-1">
                            Junte-se a nós em diversos projetos que são
                            enriquecedores tanto para si como para a comunidade!
                        </p>
                        <br />
                        <div className="col s6">
                            <Link
                                to="/register"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable waves-light red">
                                Registar
                            </Link>
                        </div>
                        <div className="col s6">
                            <Link
                                to="/login"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-large btn-flat waves-effect hoverable blue white-text">
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Landing;