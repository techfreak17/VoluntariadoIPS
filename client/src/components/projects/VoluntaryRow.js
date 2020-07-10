import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import Popup from "reactjs-popup";
import '../../componentsCSS/Modal.css'

class VoluntaryRow extends Component {

  constructor(props) {
    super(props);
    this.removeVoluntary = this.removeVoluntary.bind(this);
    this.state = {
      remove: false
    }
  }

  removeVoluntary() {
    const newObj = {
      projectID: this.props.project,
    };
    axios.post('/api/projects/removeVoluntary/' + this.props.obj._id, newObj)
      .then(window.location.reload())
      .catch(err => console.log(err))
  }

  openWarning = () => {
    this.setState({ remove: true });
  }
  closeWarning = () => {
    this.setState({ remove: false });
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          <Link to={"/getUser/" + this.props.obj.userID} className="btn btn-primary" style={{ width: "auto", backgroundColor: "lightGrey", color: "black", marginLeft: 40 }}><i className="material-icons">search</i></Link>
          {(() => {
            if (this.props.auth.user.role === "Administrador" || this.props.responsibleID === this.props.userID) {
              return (
                <button onClick={this.openWarning} className="btn btn-danger" style={{ width: "auto", backgroundColor: "red", marginLeft: 40, color: "white" }}><i className="material-icons">remove</i></button>
              )
            }
          })()}
          <Popup open={this.state.remove}
            closeOnDocumentClick
            onClose={this.closeWarning}>
            <div className={"Modal container"}>
              <h5 className={"center"}>Tem a certeza que pretende remover este Voluntário deste Projeto?</h5>
              <div className="botoes" style={{ display: "flex", justifyContent: "space-around", marginBottom: 10 }}>
                <button className="btn hoverable blue accent-3" style={{ borderRadius: 5 }} onClick={this.removeVoluntary}>CONFIRMAR</button>
                <button className="btn hoverable accent-3" style={{ borderRadius: 5, backgroundColor: "red" }} onClick={this.closeWarning}>CANCELAR</button>
              </div>
            </div>
          </Popup>
        </td>
      </tr>

    );
  }
}

VoluntaryRow.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { VoluntaryRow }
)(VoluntaryRow);