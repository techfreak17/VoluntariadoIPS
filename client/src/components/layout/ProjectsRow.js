import React, { Component } from 'react';
import axios from 'axios';

class ProjectsRow extends Component {

    constructor(props) {
        super(props);
        this.state = { project: [{ title: "", date: "", synopsis:"" }, { title: "", date: "",synopsis:"" }, { title: "", date: "",synopsis:"" }] };
    }

    componentDidMount() {
        axios.get('/api/projects/listProjects')
            .then(response => {
                this.myDate = new Date(this.props.obj.date);
                this.myDate = this.myDate.toLocaleString();
                this.setState({ title: response.data.title, date: this.myDate, synopsis: response.data.synopsis });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <li>
                <img src={require("./images/Voluntariado.png")} alt="Unsplashed background img 1" />
                <div className={this.props.className}>
                    <h2 style={{ fontFamily: "monospace", fontWeight: "bold" }}>{this.props.obj.title}</h2>
                    <h5><i className="material-icons">access_time</i> {this.props.obj.date}</h5>
                    <h5><i className="material-icons">done</i> {this.props.obj.synopsis}</h5>
                </div>
            </li>
        );
    }
}
export default ProjectsRow;