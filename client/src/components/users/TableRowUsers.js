import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Popup from "reactjs-popup";
import '../../componentsCSS/Modal.css'

class TableRowUsers extends Component {

  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = {
      delete: false
    }
  }

  delete() {
    axios.get('/api/admin/deleteUser/' + this.props.obj._id)
      .then(window.location.reload())
      .catch(err => console.log(err))
  }

  openWarning = () => {
    this.setState({ delete: true });
  }
  closeWarning = () => {
    this.setState({ delete: false });
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.username}
        </td>
        <td>
          {this.props.obj.email}
        </td>
        <td>
          {this.props.obj.role}
        </td>
        <td>
          <Link to={"/getUser/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "#D6E6F2", color: "black" }}><i className="material-icons">search</i></Link>
          {(() => {
            if (this.props.obj.role === "Voluntário") {
              return (
                <Link to={"/editVoluntary/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "lightGrey", color: "black", marginLeft: 40 }}><i className="material-icons">edit</i></Link>
              )
            }
          })()}
          {(() => {
            if (this.props.obj.role === "Empresa") {
              return (
                <Link to={"/editCompany/" + this.props.obj._id} className="btn btn-primary" style={{ width: "auto", backgroundColor: "lightGrey", color: "black", marginLeft: 40 }}><i className="material-icons">edit</i></Link>
              )
            }
          })()}
          {(() => {
            if (this.props.obj.role !== "Administrador") {
              return (
                <button onClick={this.openWarning} className="btn btn-danger" style={{ width: "auto", backgroundColor: "red", color: "black", marginLeft: 40 }}><i className="material-icons">delete</i></button>
              )
            }
          })()}
          <Popup open={this.state.delete}
            closeOnDocumentClick
            onClose={this.closeWarning}>
            <div className="Modal container">
              <h5 className="center">Tem a certeza que pretende apagar este Utilizador?</h5>
              <div className="botoes" style={{ display: "flex", justifyContent: "space-around", marginBottom: 10 }}>
                <button className="btn hoverable blue accent-3" style={{ borderRadius: 5 }} onClick={this.delete}>CONFIRMAR</button>
                <button className="btn hoverable accent-3" style={{ borderRadius: 5, backgroundColor: "red" }} onClick={this.closeWarning}>CANCELAR</button>
              </div>
            </div>
          </Popup>
        </td>
      </tr>
    );
  }
}

export default TableRowUsers;