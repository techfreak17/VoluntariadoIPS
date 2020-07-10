import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Popup from "reactjs-popup";
import '../../componentsCSS/Modal.css'

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.joinProject = this.joinProject.bind(this);
    this.myDate = new Date(props.obj.date);
    this.myDate = this.myDate.toLocaleDateString();
    this.state = {
      delete: false,
      join: false
    }
  }

  delete() {
    axios.get('/api/projects/deleteProject/' + this.props.obj._id)
      .then(window.location.reload())
      .catch(err => console.log(err))
  }

  joinProject() {
    const newObj = {
      userID: this.props.auth.user.id,
    };
    axios.post('/api/voluntaries/joinProject/' + this.props.obj._id, newObj)
      .then(window.location.reload())
      .catch(err => console.log(err))
  }

  openWarning = () => {
    this.setState({ delete: true });
  }
  closeWarning = () => {
    this.setState({ delete: false });
  }

  openWarningJoin = () => {
    this.setState({ join: true });
  }
  closeWarningJoin = () => {
    this.setState({ join: false });
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
          <Link to={"/getProject/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "#D6E6F2", color: "black" }}><i className="material-icons">search</i></Link>
          {(() => {
            if (this.props.auth.user.role === "Administrador") {
              return (
                <Link to={"/editProject/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "lightGrey", color: "black", marginLeft: 40 }}><i className="material-icons">edit</i></Link>
              )
            }
          })()}
          {(() => {
            if (this.props.auth.user.role === "Administrador") {
              return (

                <button onClick={this.openWarning} className="btn btn-danger" style={{ width: "auto", backgroundColor: "red", marginLeft: 40, color: "black" }}><i className="material-icons">delete</i></button>
              )
            }
          })()}
          {(() => {
            if (this.props.auth.user.role === "Voluntário") {
              if (!this.props.obj.enroled_IDs.includes(this.props.auth.user.id)) {
                return (
                  <button onClick={this.openWarningJoin} className="btn btn-danger" style={{ width: "auto", backgroundColor: "green", marginLeft: 40, color: "white" }}><i className="material-icons">add</i></button>
                )
              }
            }
          })()}
          <Popup open={this.state.delete}
            closeOnDocumentClick
            onClose={this.closeWarning}>
            <div className={"Modal container"} style={{ width: "50" }}>
              <h5 className={"center"}>Tem a certeza que pretende apagar este Projeto?</h5>
              <div>
                <button className="btn btn-medium waves-effect waves-light hoverable red left" onClick={this.delete}>CONFIRMAR</button>
                <button className="btn btn-medium waves-effect waves-light hoverable gray right" onClick={this.closeWarning}>CANCELAR</button>
              </div>
            </div>
          </Popup>

          <Popup open={this.state.join}
            closeOnDocumentClick
            onClose={this.closeWarningJoin}>
            <div className={"Modal container"} style={{ width: "50" }}>
              <h5 className={"center"}>Tem a certeza que pretende entrar neste Projeto?</h5>
              <div>
                <button className="btn btn-medium waves-effect waves-light hoverable red left" onClick={this.joinProject}>CONFIRMAR</button>
                <button className="btn btn-medium waves-effect waves-light hoverable gray right" onClick={this.closeWarningJoin}>CANCELAR</button>
              </div>
            </div>
          </Popup>
        </td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(TableRow);
