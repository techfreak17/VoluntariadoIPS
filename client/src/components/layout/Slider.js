import React, { Component } from 'react';

class Slider extends Component {

    render() {
        return (
            <li>
            <img src={require("./images/Voluntariado1.jpg")} alt="Unsplashed background img 1" />
            <div className={this.props.className}>
                <h2 style={{ fontFamily: "monospace", fontWeight: "bold" }}>{this.props.obj.slogan}</h2>
            </div>
        </li>
        );
    }
}

export default Slider;
