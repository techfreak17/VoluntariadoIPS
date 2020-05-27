import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css";
import options from "materialize-css";
import Slider from "../layout/Slider"


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { titles: [{ title: "#Dinamizar"}, { title: "#Responsabilizar"}, { title: "#Qualificar"}] };
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

        let titleL = [];


        const titleList = () => {
            for (let i = 0; i < this.state.titles.length; i++) {
                titleL.push(<Slider obj={this.state.titles[i]} key={i} className="caption left-align" />);
            }
            return titleL;
          };

        return (
            <div className="container-fluid" style={{ width: "100%" }}>
                <div className="container" style={{ width: "65%", backgroundColor: "#23395D", borderRadius: 50, marginTop: 20, boxShadow: "0 0 10px 2px green", marginBottom: 30}}>
                    <div className="section">
                        <h2 className="header center text-lighten-2" style={{ fontFamily: "monospace", fontWeight: "bold", color: "#50C878" }}>Plataforma VoluntariadoIPS</h2>
                        <div className="row center" style={{ width: "100%", textLighten: 2, fontWeight: "bold", color: "white" }}>
                            <h3 className="header col s12 " ><b>Bem-Vindo</b></h3>
                            <h5 className="header col s12 " ><b>Pronto para ajudar ?</b></h5>
                        </div>
                    </div>
                </div>

                <div className="slider">
                    <ul className="slides">
                        {titleList()}
                    </ul>
                </div>

                <div className="container-fluid" style={{paddingBottom:200}}>
                <div className="container">
                    <div className="row">
                        <div className="col s12 m4">
                            <div className="icon-block">
                                <h2 className="center brown-text"><img src={require('../layout/images/MOODLE.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive" style={{ position: "absolute", left: 0, height: 150, width: "auto", paddingLeft:300}}/></h2>
                            </div>
                        </div>
                        <div className="col s12 m4" >
                            <div className="icon-block">
                            <h2 className="center brown-text"><img src={require('../layout/images/AAIPS.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive" style={{ position: "absolute", left: 0, height: 150, width: "auto", paddingLeft:600, paddingTop: 40}}/></h2>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <div className="icon-block">
                            <h2 className="center brown-text"><img src={require('../layout/images/IPS.png')}
                                    alt="(Não esquecer de verificar no spam)"
                                    className="img-responsive" style={{ position: "absolute", left: 0, height: 150, width: "auto", paddingLeft:950, paddingTop: 40}}/></h2>
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