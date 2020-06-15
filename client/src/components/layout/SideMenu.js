import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class SideMenu extends Component {
    render() {
        return (
            <ul id="slide-out" className="sidenav">
                <li><div className="user-view">
                    <div className="background">
                        <img src={require('./images/Voluntariado.png')}
                            alt="(Não esquecer de verificar no spam)"
                            className="img-responsive" />
                    </div>
                    <p><img className="circle" alt="(Não esquecer de verificar no spam)" src={require('./images/avatar.jpg')} /></p>
                    <p><span className="white-text name">{this.props.username}</span></p>
                    <p><span className="white-text email">{this.props.email}</span></p>
                </div></li>
                <li><a href={"/baseProfile/"}><i className="material-icons left">person</i>Perfil</a></li>
                <li><a href={"/baseProfile/"}><i className="material-icons left">collections</i>Estatísticas</a></li>
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