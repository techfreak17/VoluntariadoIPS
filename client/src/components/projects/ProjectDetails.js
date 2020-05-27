import React, { Component } from 'react';
import axios from 'axios';
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
    <div className="card" style={{backgroundColor:"#f4f4f4",width: "600px",height: "800px",margin: "10px auto",boxShadow: "1px 1px 10px 1px "}}>
        <div className="card-header" style={{overflow:"hidden",height: "300px", width: "600px"}}>
        <img src={require('../layout/images/image.jpg')}alt="(Não esquecer de verificar no spam)"className="img-responsive"/>
        </div>
        
        <div className="card-content" style={{padding:"0px", height: "250px",width: "600px", paddingTop:-20, paddingBottom: 500, paddingLeft:50, paddingRight:20}}>
            <h3 style={{fontWeight:"bolder",color: "#50C878"}}>{this.state.title}</h3>
            <div style={{padding:"0px", height: "250px",width: "600px", paddingTop:-20, paddingBottom: 500}}>
              <h5  style={{fontWeight:"bolder"}}>Contactos do Responsável:</h5>
              <p style={{alignItems:"center"}}><i className="material-icons">person</i> {this.state.contact_person}</p>
              <p><i className="material-icons">email</i> {this.state.email_person}</p>
              <p><i className="material-icons">phone</i> {this.state.phone_person}</p>
              <h5  style={{fontWeight:"bolder"}}>Detalhes do Projeto:</h5>
              <p><i className="material-icons">access_time</i> {this.state.date}</p>
              <p><i className="material-icons">description</i> {this.state.description}</p>
              <p><i className="material-icons">check</i> {this.state.target_audience}</p><br></br>
              <Link to="/listProjects" style={{width: "120px", borderRadius: 10,letterSpacing: "1.5px",fontWeight: "bold",}}
              className="btn btn-large waves-effect waves-light hoverable black">Voltar</Link>
            </div>
        </div>
    </div>
    )
  }
}