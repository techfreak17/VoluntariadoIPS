import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
    render() {
        /*
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, options);
        });
        */
        return (
            <div className="container-fluid" style={{ width: "100%" }}>
                <div className="parallax-container valign-wrapper" style={{ width: "100%", minHeight: 380, lineHeight: 0, color: "white", height: 400, position: "relative", overflow: "hidden" }}>
                    <div className="section no-pad-bot" style={{ width: "100%" }}>
                        <div className="container">
                            <h1 className="header center teal-text text-lighten-2">Bem-vindo à plataforma {" "}
                                <span style={{ fontFamily: "monospace" }}>VoluntariadoIPS</span></h1>
                            <div className="row center" style={{ width: "50%", textLighten: 2 }}>
                                <h5 className="header col s12 ">Pronto para ajudar?
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
                                            borderRadius: 10,
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
                                            borderRadius: 40,
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
                    <div className="container-fluid" style={{
                        position: "absolute",
                        top: -50,
                        left: 0,
                        width: "100%",
                        height: 700,
                        zIndex: -1
                    }}>
                        <img src={require("./images/background1.jpg")} alt="Unsplashed background img 1" style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>



                <div className="container-fluid">

                    <div className="slider">
                        <ul className="slides">
                            <li>
                                <img src={require("./images/background1.jpg")} alt="Unsplashed background img 1" />
                                <div className="caption center-align">
                                    <h3>This is our big Tagline!</h3>
                                    <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
                                </div>
                            </li>
                            <li>
                                <img src={require("./images/background1.jpg")} alt="Unsplashed background img 1" />
                                <div className="caption left-align">
                                    <h3>Left Aligned Caption</h3>
                                    <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
                                </div>
                            </li>
                            <li>
                                <img src={require("./images/background1.jpg")} alt="Unsplashed background img 1" />
                                <div className="caption right-align">
                                    <h3>Right Aligned Caption</h3>
                                    <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
                                </div>
                            </li>
                            <li>
                                <img src={require("./images/background1.jpg")} alt="Unsplashed background img 1" />
                                <div className="caption center-align">
                                    <h3>This is our big Tagline!</h3>
                                    <h5 className="light grey-text text-lighten-3">Here's our small slogan.</h5>
                                </div>
                            </li>
                        </ul>
                    </div>



                    <div className="section">

                        <div className="row">

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="medium material-icons">flash_on</i></h2>
                                    <h5 className="center">Speeds up development</h5>
                                    <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="medium material-icons">group</i></h2>
                                    <h5 className="center">User Experience Focused</h5>
                                    <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
                                </div>
                            </div>

                            <div className="col s12 m4">
                                <div className="icon-block">
                                    <h2 className="center brown-text"><i className="medium material-icons">settings</i></h2>
                                    <h5 className="center">Easy to work with</h5>
                                    <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>


            </div >
        );
    }
}
export default Landing;