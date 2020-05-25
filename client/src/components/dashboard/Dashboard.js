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
        this.state = { project: [{ title: "titulo", description: "descricao" }, { title: "titulo", description: "descricao" }, { title: "titulo", description: "descricao" }, { title: "titulo", description: "descricao" }] };
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    componentDidMount() {
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
        });

        const { user } = this.props.auth;

        return (
            <div className="container-fluid" style={{ width: "100%" }}>
                <div className="slider">

                    <ul className="slides">
                        <ProjectsRow obj={this.state.project[0]} className="caption left-align" />
                        <ProjectsRow obj={this.state.project[1]} className="caption center-align" />
                        <ProjectsRow obj={this.state.project[2]} className="caption right-align" />
                    </ul>
                </div>
                <div className="container" style={{ width: "65%", backgroundColor: "#23395D", borderRadius: 50, marginTop: 15, boxShadow: "0 0 10px 2px green" }}>
                        <div className="section">
                            <h2 className="header center text-lighten-2" style={{ fontFamily: "monospace", fontWeight: "bold", color: "#50C878"}}>Bem-vindo à plataforma {" "}
                                <span style={{ fontFamily: "monospace" }}>VoluntariadoIPS</span></h2>
                            <div className="row center" style={{ width: "100%", textLighten: 2, fontWeight: "bold", color: "white" }}>
                                <h5 className="header col s12 " ><b>Olá</b> {user.name.split(" ")[0]},
                                <p className="flow-text text-darken-1" style={{ fontFamily: "monospace" }}>Esta é a tua página principal, Bem-vindo</p>
                                </h5>
                            </div>
                    </div>
                </div>



                <div className="container-fluid">



                    <div className="container">

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