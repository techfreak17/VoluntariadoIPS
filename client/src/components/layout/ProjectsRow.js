import React, { Component } from 'react';

class ProjectsRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <img src={require("./images/background1.jpg")} alt="Unsplashed background img 1" />
                <div className={this.props.className}>
                    <h3 style={{fontFamily: "monospace", fontWeight: "bold"}}>{this.props.obj.title}</h3>
                    <h5 className="light grey-text text-lighten-3">{this.props.obj.description}</h5>
                </div>
            </li>
        );
    }
}
export default ProjectsRow;