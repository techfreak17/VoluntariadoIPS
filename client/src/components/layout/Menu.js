import React, { Component } from "react";

class Menu extends Component {
    render() {
        return (
            <div className="container">
                <nav className="nav" style={{
                    width: "70%",
                    position: "fixed",
                    bottom: 0,
                    backgroundColor: "#23395D"
                }}>
                    <div className="nav-wrapper">
                        <ul id="nav-mobile" className="left">
                            <li><a href="/dashboard"><i className="material-icons">home</i></a></li>
                            <li><a href="/listProjects">Projetos</a></li>
                            <li><a href="/listUsers">Utilizadores</a></li>
                            <li><a href="..."></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Menu;