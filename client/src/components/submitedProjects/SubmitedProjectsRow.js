import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Popup from "reactjs-popup";
import '../../componentsCSS/Modal.css'

class SubmitedProjectsRow extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.accept = this.accept.bind(this);
    this.myDate = new Date(props.obj.date);
    this.myDate = this.myDate.toLocaleDateString();
    this.state={
      delete:false,
      accept:false
    }
  }

  delete() {
    axios.get('/api/submitedProjects/submitDeleteProject/' + this.props.obj._id)
      .catch(err => console.log(err))
    window.location.reload();
  }

  accept() {
    axios.post("/api/submitedProjects/acceptSubmitedProject/" + this.props.obj._id)
        .catch(err => console.log(err))
    window.location.reload();
  }

  openWarningDelete = () => {
    this.setState({ delete: true });
  }
  closeWarningDelete = () => {
    this.setState({ delete: false });
  }

  openWarningAccept = () => {
    this.setState({ accept: true });
  }
  closeWarningAccept = () => {
    this.setState({ accept: false });
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
          <Link to={"/getSubmitedProject/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "#D6E6F2", color: "black" }}><i className="material-icons">search</i></Link>
          <button onClick={this.openWarningAccept} className="btn btn-danger" style={{ width: "auto", backgroundColor: "green", color: "white", marginLeft: 40 }}><i className="material-icons">done</i></button>
          <Popup open={this.state.accept}
            closeOnDocumentClick
            onClose={this.closeWarningAccept}>
            <div className="Modal container">
              <h5 className="center">Tem a certeza que pretende aceitar este Projeto?</h5>
              <div className="botoes" style={{display: "flex", justifyContent: "space-around", marginBottom: 10}}>
                <button className="btn hoverable blue accent-3" style={{borderRadius: 5}} onClick={this.accept}>CONFIRMAR</button>
                <button className="btn hoverable accent-3" style={{borderRadius: 5, backgroundColor: "red"}}onClick={this.closeWarningAccept}>CANCELAR</button>
              </div>
            </div>
          </Popup>
          <button onClick={this.openWarningDelete} className="btn btn-danger" style={{ width: "auto", backgroundColor: "red", marginLeft: 40, color: "white" }}><i className="material-icons">close</i></button>
          <Popup open={this.state.delete}
            closeOnDocumentClick
            onClose={this.closeWarningDelete}>
            <div className="Modal container">
              <h5 className="center">Tem a certeza que pretende apagar esta submissão de Projeto?</h5>
              <div className="botoes" style={{display: "flex", justifyContent: "space-around", marginBottom: 10}}>
                <button className="btn hoverable blue accent-3" style={{borderRadius: 5}} onClick={this.delete}>CONFIRMAR</button>
                <button className="btn hoverable accent-3" style={{borderRadius: 5, backgroundColor: "red"}}onClick={this.closeWarningDelete}>CANCELAR</button>
              </div>
            </div>
          </Popup>
        </td>
      </tr>
    );
  }
}

SubmitedProjectsRow.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(SubmitedProjectsRow);
