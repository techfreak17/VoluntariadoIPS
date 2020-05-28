import React, { Component } from 'react';

class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = { project: [{ title: ""}, { title: ""}, { title: ""}, { title: ""}] };
    }

    render() {
        return (
            <li>
                <img src={require("./images/Voluntariado1.jpg")} alt="Unsplashed background img 1" />
                <div className={this.props.className}>
                    <h3 style={{ fontFamily: "monospace", fontWeight: "bold" }}>{this.props.obj.title}</h3>
                </div>
            </li>
        );
    }
}
export default Slider;