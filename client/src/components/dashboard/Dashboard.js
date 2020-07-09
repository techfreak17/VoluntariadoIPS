import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css";
import options from "materialize-css";
import Slider from "../layout/Slider"
import axios from 'axios';
import "../../componentsCSS/Dashboard.css"


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { slogans: [{ slogan: "#Dinamizar" }, { slogan: "#Responsabilizar" }, { slogan: "#Qualificar" }] };
    }


    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

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
                this.setState({ titles: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.slider');
            M.Slider.init(elems, options);
        });

        let titleL = [];

        const titleList = () => {
            for (let i = 0; i < this.state.slogans.length; i++) {
                titleL.push(<Slider obj={this.state.slogans[i]} key={i} className="caption left-align" />);
            }
            return titleL;
        };

        return (
            <div className="container-fluid" style={{ width: "100%" }}>
                <div className="container" style={{ width: "50%", backgroundColor: "#23395D", borderRadius: 50, marginTop: 40, marginBottom: 40, boxShadow: "0 0 10px 3px green" }}>
                    <div className="section">
                        <h2 className="header center text-lighten-2" style={{ fontFamily: "monospace", fontWeight: "bold", color: "#50C878" }}>Plataforma VoluntariadoIPS</h2>
                        <div className="row center" style={{ width: "100%", textLighten: 2, fontWeight: "bold", color: "#FEF4E8" }}>
                            <h5 className="header col s12 "><b>Bem-Vindo</b>
                                <p>Pronto para ajudar ?</p></h5>
                            <a className="btn white-text" href="/listProjects" style={{ borderRadius: 20, backgroundColor: "#50C878" }}>Ver Projetos</a>
                        </div>
                    </div>
                </div>
                
                <div style={{ width: "70%", margin: "auto" }}>
                    <div className="container-fluid" style={{ marginTop: 50, marginBottom: 20, backgroundColor: "#FEF4E8", padding: 30, borderRadius: 50, boxShadow: "0 0 10px 10px #23395D" }}>
                        <div className="slider">
                            <ul className="slides">
                                {titleList()}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="container" style={{ marginBottom: 60, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
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