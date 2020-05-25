import React, { Component } from 'react';
import axios from 'axios';
//import M from 'materialize-css';
import { Link } from "react-router-dom";


export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      contact_person: "",
      email_person: "",
      phone_person: "",
      synopsis: "",
      target_audience: "",
      objectives: "",
      date: "",
      areas: "",
      description: "",
      related_entities: "",
      observations: "",
      authorization: "",
      user_in_charge: ""
    }
  }

  componentDidMount() {
    axios.get('/api/projects/getProject/' + this.props.match.params.id)
      .then(response => {
        this.myDate = new Date(response.data.date);
        this.myDate = this.myDate.toLocaleDateString();
        this.setState({
          title: response.data.title,
          contact_person: response.data.contact_person,
          email_person: response.data.email_person,
          phone_person: response.data.phone_person,
          synopsis: response.data.synopsis,
          target_audience: response.data.target_audience,
          objectives: response.data.objectives,
          date: this.myDate,
          areas: response.data.areas,
          description: response.data.description,
          related_entities: response.data.related_entities,
          observations: response.data.observations,
          authorization: response.data.authorization,
          user_in_charge: response.data.user_in_charge,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
    <div className="card" style={{backgroundColor:"#f4f4f4",width: "400px",margin: "10px auto",boxShadow: "1px 1px 10px 1px "}}>
        <div className="card-header" style={{overflow:"hidden",maxHeight: "200px"}}>
        <img src={require('../layout/images/image.jpg')}alt="(Não esquecer de verificar no spam)"className="img-responsive"/>
        </div>
        <div className="card-content" style={{padding:"0px"}}>
            <h2>{this.state.title}</h2>
            <h5>Responsável: {this.state.contact_person}</h5>
            <p style={{fontWeight:"bold"}}>{this.state.date}</p>
            <p>{this.state.description}</p>
        </div>
        <Link to="/listProjects"> Voltar</Link>
    </div>
    )
  }
}