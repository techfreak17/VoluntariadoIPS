import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Popup from "reactjs-popup";
import '../../componentsCSS/Modal.css'

class VoluntaryProjectsTableRow extends Component {

  constructor(props) {
    super(props);
    this.myDate = new Date(props.obj.date);
    this.myDate = this.myDate.toLocaleDateString();
    this.unjoinProject = this.unjoinProject.bind(this);
    this.state={
      unjoin:false
    }
  }

  unjoinProject() {
    const newObj = {
      userID: this.props.auth.user.id,
    };
    axios.post('/api/voluntaries/unjoinProject/' + this.props.obj._id, newObj)
      .then(window.location.reload())
      .catch(err => console.log(err))
    ;
  }

  openWarning = () => {
    this.setState({ unjoin: true });
  }
  closeWarning = () => {
    this.setState({ unjoin: false });
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.title}
        </td>
        <td>
          {this.myDate}
        </td>
        <td>
          {this.props.obj.synopsis}
        </td>
        <td>
          <Link to={"/getVoluntaryProjects/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "#D6E6F2", color: "black" }}><i className="material-icons">search</i></Link>
          <button onClick={this.openWarning} className="btn btn-danger" style={{ width: "auto", backgroundColor: "red", marginLeft: 40, color: "white" }}><i className="material-icons">close</i></button>
          <Popup open={this.state.unjoin}
            closeOnDocumentClick
            onClose={this.closeWarning}>
            <div className="Modal container">
              <h5 className="center">Tem a certeza que pretende sair deste Projeto?</h5>
              <div className="botoes" style={{display: "flex", justifyContent: "space-around", marginBottom: 10}}>
                <button className="btn hoverable blue accent-3" style={{borderRadius: 5}} onClick={this.unjoinProject}>CONFIRMAR</button>
                <button className="btn hoverable accent-3" style={{borderRadius: 5, backgroundColor: "red"}}onClick={this.closeWarning}>CANCELAR</button>
              </div>
            </div>
          </Popup>
        </td>
      </tr>
    );
  }
}

VoluntaryProjectsTableRow.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(VoluntaryProjectsTableRow);
