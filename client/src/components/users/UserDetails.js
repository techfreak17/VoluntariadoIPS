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
    <div className="card" style={{backgroundColor:"#f4f4f4",width: "400px",margin: "10px auto",boxShadow: "1px 1px 10px 1px "}}>
        <div className="card-header" style={{overflow:"hidden",maxHeight: "200px"}}>
        <img src={require('../layout/images/image1.jpeg')}alt="(Não esquecer de verificar no spam)"className="img-responsive"/>
        </div>
        <div className="card-content" style={{padding:"12px"}}>
            <h2>{this.state.name}</h2>
            <h5>{this.state.number}</h5>
            <p style={{fontWeight:"bold"}}>{this.state.role}</p>
            <p>{this.state.email}</p>
        </div>
        <Link to="/listUsers"> Voltar</Link>
    </div>
    )
  }
}