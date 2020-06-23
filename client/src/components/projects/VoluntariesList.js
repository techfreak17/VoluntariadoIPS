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
    axios.get('/api/projects/getProjectVoluntaries/' + this.props.match.params.id)//add the project id
      .then(res => {
        this.setState(prevState => ({
          voluntaries: [...prevState.voluntaries, ...res.data]
        }))
      });
  }


  rowVolun() {
    return this.state.voluntaries.map(function (object, i) {
      return <VoluntaryRow obj={object} key={i} />;
    });
  }


  goBack() {
    window.history.back();
  }

  render() {
    return (
      <div  className="card" style={{backgroundColor: "#00000", width: 900, margin: "10px auto", marginBottom: 75, boxShadow: "1px 1px 10px 5px black" }}>
        <button onClick={this.goBack} className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i>
              Voltar
            </button>
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
