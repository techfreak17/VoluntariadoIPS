import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import M from "materialize-css";
import axios from 'axios';

class SideMenu extends Component {

    componentDidMount() {
        axios.get('/api/users/getUserDetails/' + this.props.auth.user.id)
            .then(response => {
                this.insertImage(response.data[0].img);
            });
    }

    insertImage = (file) => {
        let myDiv = document.getElementById("userImgSideMenu");
        let img = document.createElement('img');
        let imageFile = null;

        if (file) {
            imageFile = `data:${file.contentType};base64,${Buffer.from(file.data).toString('base64')}`;
        } else {
            imageFile = require('../layout/images/avatar.jpg');
        }

        img.src = imageFile;
        img.alt = "(No Image)";
        img.className = "circle";

        myDiv.appendChild(img);
    }

    render() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            M.Sidenav.init(elems, { edge: 'right' });
        });

        return (
            <ul id="slide-out" className="sidenav">
                <li><div className="user-view">
                    <div className="background">
                        <img src={require('./images/Voluntariado.png')}
                            alt="(Não esquecer de verificar no spam)"
                            className="img-responsive" />
                    </div>
                    <div id="userImgSideMenu"></div>
                    <p><span className="white-text name">{this.props.username}</span></p>
                    <p><span className="white-text email">{this.props.email}</span></p>
                </div></li>
                <li><a href={"/baseProfile/" + this.props.auth.user.id}><i className="material-icons left">account_box</i>Perfil</a></li>
                <li><div className="divider"></div></li>

                {(() => {
                    if (this.props.auth.user.role === "Voluntário") {
                        return (
                            <div>
                                <li><button className="subheader" style={{ backgroundColor: "transparent", border: "none" }}>Minhas Estatísticas</button></li>
                                <li><a href={"/statsVoluntary"}><i className="material-icons left">search</i>Meus Projetos</a></li>
                            </div>
                        )
                    }
                })()}
                <li><button className="subheader" style={{ backgroundColor: "transparent", border: "none" }}>Estatísticas Utilizadores</button></li>
                <li><a href={"/statsNumberUsers"}><i className="material-icons left">search</i>Número de Utilizadores</a></li>
                <li><button className="subheader" style={{ backgroundColor: "transparent", border: "none" }}>Estatísticas Projetos</button></li>
                <li><a href={"/statsNumberProjects"}><i className="material-icons left">search</i>Voluntários nos Projetos</a></li>
                <li><a href={"/statsRatingProjects"}><i className="material-icons left">search</i>Classificação dos Projetos</a></li>
                <li><a href={"/statsCompareProjects"}><i className="material-icons left">search</i>Lista dos Projetos</a></li>
                <li><button onClick={this.props.logout} className="blue btn" style={{ borderRadius: 10, marginLeft: 12, marginBottom: 5 }}>Sair</button></li>
            </ul>
        );
    }
}

SideMenu.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(SideMenu);