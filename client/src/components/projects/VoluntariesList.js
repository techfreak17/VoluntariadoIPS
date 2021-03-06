import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import VoluntaryRow from './VoluntaryRow.js';

//get the project, which has all of the voluntaries ID's
//GET the voluntary by id
//Repeat
class VoluntariesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      voluntaries: []
    }
  }

  componentDidMount() {
    axios.get('/api/projects/getProjectVoluntaries/' + this.props.projectID)//add the project id
      .then(res => {
        this.setState(prevState => ({
          voluntaries: [...prevState.voluntaries, ...res.data],
        }))
      });
  }

  rowVolun = () => {
    let project = this.props.projectID;
    let responsibleID = this.props.responsibleID
    let userID = this.props.userID
    return this.state.voluntaries.map(function (object, i) {
      return <VoluntaryRow obj={object} key={i} project = {project} userID= {userID} responsibleID= {responsibleID}/>;
    });
  }

  render() {
    return (
      <div className="card" style={{width: "auto" }}>
        <table className="striped">
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

VoluntariesList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { VoluntariesList }
)(VoluntariesList);
