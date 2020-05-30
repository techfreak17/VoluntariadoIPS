import React, { Component } from 'react';
import axios from 'axios';

class ProjectsRow extends Component {

    constructor(props) {
        super(props);
        this.state = { project: [{ title: "", date: "" }, { title: "", date: "" }, { title: "", date: "" }, { title: "", date: "" }] };
    }

    componentDidMount() {
        axios.get('/api/projects/listProjects')
            .then(response => {
                this.myDate = new Date(this.props.obj.date);
                this.myDate = this.myDate.toLocaleDateString();
                this.setState({ title: response.data.description, date: this.myDate });
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
                    <h3 style={{ fontFamily: "monospace", fontWeight: "bold" }}>{this.props.obj.title}</h3>
                    <h5 className="light grey-text text-lighten-3">{this.state.date}</h5>
                </div>
            </li>
        );
    }
}
export default ProjectsRow;