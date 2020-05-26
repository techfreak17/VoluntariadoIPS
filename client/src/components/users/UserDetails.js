import React, { Component } from 'react';
import axios from 'axios';
//import M from 'materialize-css';
import { Link } from "react-router-dom";


export default class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
        number: "",
        name: "",
        role: "",
        email: "",
    }
  }

  componentDidMount() {
    axios.get('/api/users/getUser/' + this.props.match.params.id)
      .then(response => {
        this.myDate = new Date(response.data.date);
        this.myDate = this.myDate.toLocaleDateString();
        this.setState({
            number: response.data.number,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="card" style={{backgroundColor:"#f4f4f4",width: "600px",height: "600px",margin: "10px auto",boxShadow: "1px 1px 10px 1px "}}>
      <div className="card-header" style={{overflow:"hidden",height: "300px", width: "600px"}}>
      <img src={require('../layout/images/image1.jpeg')}alt="(Não esquecer de verificar no spam)"className="img-responsive"/>
      </div>
      
      <div className="card-content" style={{padding:"0px", height: "250px",width: "600px", paddingTop:-20, paddingBottom: 500, paddingLeft:50}}>
          <h3 style={{fontWeight:"bolder"}}>{this.state.name}</h3>
          <div style={{padding:"0px", height: "250px",width: "600px", paddingTop:-20, paddingBottom: 500, paddingLeft:70}}>
            <h5  style={{fontWeight:"bolder"}}>Detalhes do Utilizador:</h5>
            <p><i className="material-icons">email</i>{ this.state.email}</p>
            <p><i className="material-icons">phone</i>{ this.state.number}</p>
            <p><i className="material-icons">pan_tool</i>{ this.state.role}</p><br></br>
            <Link to="/listUsers" style={{width: "120px", borderRadius: 10,letterSpacing: "1.5px",fontWeight: "bold",}}
            className="btn btn-large waves-effect waves-light hoverable green">Voltar</Link>
          </div>
      </div>
  </div>
    )
  }
}