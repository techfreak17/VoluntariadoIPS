import React, { Component } from 'react';
import axios from 'axios';

class Slider extends Component {

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
            <div>
                <div className="carousel-fixed-item center">
                    <a className="btn white-text" href="/listProjects" style={{ borderRadius: 20, backgroundColor: "#23395D" }}>Ver Projeto</a>
                </div>
                <div className="carousel-item white-text">
                    <img src={require("./images/Voluntariado1.jpg")} alt="Unsplashed background img 1" />
                    <h2>First Panel</h2>
                    <p className="white-text">This is your first panel</p>
                </div>
            </div>
        );
    }
}

export default Slider;
