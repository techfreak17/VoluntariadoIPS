import React, { Component } from 'react';

class ProjectsRow extends Component {

    render() {
        let myDate = new Date(this.props.obj.date);
        myDate = myDate.toLocaleString();
        return (
            <li>
                <img src={require("./images/Voluntariado.png")} alt="Unsplashed background img 1" />
                <div className={this.props.className}>
                    <h2 style={{ fontFamily: "monospace", fontWeight: "bold" }}>{this.props.obj.title}</h2>
                    <h5><i className="material-icons">access_time</i> {myDate}</h5>
                    <h5><i className="material-icons">done</i> {this.props.obj.synopsis}</h5>
                </div>
            </li>
        );
    }
}
export default ProjectsRow;