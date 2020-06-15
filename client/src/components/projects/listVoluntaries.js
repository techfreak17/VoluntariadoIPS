import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { rowVoluntary } from './rowVoluntary';
//get the project, which has all of the voluntaries ID's
//GET the voluntary by id
//Repeat
class listVoluntaries extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voluntaries: []
    }
  }

  componentDidMount() {
    axios.get('/api/projects/getProjectVoluntaries/'+this.props.match.params.id)//add the project id
      .then(response => {
        this.setState({
          voluntaries: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  
  rowVoluntary() {
    return this.state.voluntaries.map(function (object, i) {
      return <rowVoluntary obj={object} key={i} />;
    });
  }


  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.rowVoluntary()}
          </tbody>
        </table>
      </div>
    );
  }
}

listVoluntaries.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { listVoluntaries }
)(listVoluntaries);
