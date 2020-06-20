import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import  RowVoluntary  from './RowVoluntary.js';

//get the project, which has all of the voluntaries ID's
//GET the voluntary by id
//Repeat
class ListVoluntaries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voluntaries: []
    }
  }

  componentDidMount() {
    axios.get('/api/projects/getProjectVoluntaries/'+ this.props.match.params.id)//add the project id
      .then(res=>{this.setState(prevState=>({
        voluntaries: [...prevState.voluntaries,...res.data]
      }))
    console.log(this.state.voluntaries)});
      
  }

  
  rowVolun() {
    return this.state.voluntaries.map(function (object, i) {
      return <RowVoluntary obj={object} key={i} />;
    });
  }


  render() {
    return (
      <div>
        <table  className="striped">
        <thead>
          <tr>
              <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {this.rowVolun()}
        </tbody>
      </table>
      </div>
    );
  }
}

ListVoluntaries.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { ListVoluntaries }
)(ListVoluntaries);
