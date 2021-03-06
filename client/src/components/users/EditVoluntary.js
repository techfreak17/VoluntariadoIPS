import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import options from "materialize-css";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUser } from "../../actions/userActions";
import Upload from "../upload/Upload";
import "../../componentsCSS/Forms.css";

class EditVoluntary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      name: "",
      phone: "",
      address: "",
      birthDate: "",
      memberIPS: "",
      schoolIPS: "",
      courseIPS: "",
      interestAreas: [],
      reasons: [],
      observations: "",
      authorization: false,
      fileFormData: null,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeInterestAreas = this.handleChangeInterestAreas.bind(this);
    this.handleChangeReasons = this.handleChangeReasons.bind(this);
  }

  componentDidMount() {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }
    axios.get('/api/users/getUserDetails/' + this.props.match.params.id)
      .then(response => {
        var date = new Date(response.data[1].birthDate);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var d = date.getDate();
        var mm = month < 10 ? '0' + month : month;
        var dd = d < 10 ? '0' + d : d;
        date = '' + year + "-" + mm + "-" + dd;
        this.setState({
          name: response.data[1].name,
          email: response.data[1].email,
          phone: response.data[1].phone,
          address: response.data[1].address,
          memberIPS: response.data[1].memberIPS,
          schoolIPS: response.data[1].schoolIPS,
          courseIPS: response.data[1].courseIPS,
          interestAreas: response.data[1].interestAreas,
          reasons: response.data[1].reasons,
          observations: response.data[1].observations,
          role: response.data[0].role,
          username: response.data[0].username,
          birthDate: date
        });
      })
      .catch(error => console.log(error));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChangeInterestAreas(event) {
    this.setState({
      interestAreas: Array.from(event.target.selectedOptions, (item) => item.value), validationErrorInterestAreas:
        event.target.value === ""
          ? "Dever?? preencher o campo ??reas Interesse"
          : ""
    });
  }

  handleChangeReasons(event) {
    this.setState({
      reasons: Array.from(event.target.selectedOptions, (item) => item.value), validationErrorReasons:
        event.target.value === ""
          ? "Dever?? preencher o campo Raz??es Para Querer Ser Volunt??rio"
          : ""
    });
  }

  goBack() {
    window.history.back();
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      memberIPS: this.state.memberIPS,
      schoolIPS: this.state.schoolIPS,
      courseIPS: this.state.courseIPS,
      interestAreas: this.state.interestAreas,
      reasons: this.state.reasons,
      observations: this.state.observations,
      username: this.state.username,
      birthDate: this.state.birthDate,
      role: this.state.role
    };

    this.props.editUser(this.props.match.params.id, this.state.fileFormData, obj, this.props.history);
  }

  handleUpload = (formData) => {
    this.setState({ fileFormData: formData });
  }

  render() {
    const { errors } = this.state;

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      M.FormSelect.init(elems, options);
    });

    return (

      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <h3>Editar Detalhes</h3>
            <p><b>Nota:</b> Todos os campos a * dever??o ser preenchidos.</p>
            <form noValidate>
              <div className="input-field col s12">
                <label htmlFor="name">Username *</label><br></br>
                <input
                  onChange={e => this.setState({
                    username: e.target.value,
                    validationErrorUsername: e.target.value === "" ? "Dever?? preencher o campo Username" : ""
                  })}
                  value={this.state.username}
                  id="username"
                  type="text"
                  error={errors.username}
                  className={classnames("", {
                    invalid: errors.username
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorUsername}
                </div>
                <span className="red-text">{errors.username}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="email">Email *</label><br></br>
                <input
                  onChange={e => this.setState({
                    email: e.target.value,
                    validationErrorEmail: e.target.value === "" ? "Dever?? preencher o campo Email" : ""
                  })}
                  value={this.state.email}
                  id="email"
                  type="email"
                  error={errors.email}
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorEmail}
                </div>
                <span className="red-text">{errors.email}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Nome Completo *</label><br></br>
                <input
                  onChange={e => this.setState({
                    name: e.target.value,
                    validationErrorName: e.target.value === "" ? "Dever?? preencher o campo Nome Completo" : ""
                  })}
                  value={this.state.name}
                  id="name"
                  type="text"
                  error={errors.name}
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorName}
                </div>
                <span className="red-text">{errors.name}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="number">N?? Telem??vel *</label><br></br>
                <input
                  onChange={e => this.setState({
                    phone: e.target.value,
                    validationErrorPhone: e.target.value === "" ? "Dever?? preencher o campo N?? Telem??vel" : ""
                  })}
                  value={this.state.phone}
                  id="phone"
                  type="number"
                  error={errors.phone}
                  className={classnames("", {
                    invalid: errors.phone
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorPhone}
                </div>
                <span className="red-text">{errors.phone}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Morada (Concelho)</label><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.address}
                  id="address"
                  type="text"
                  error={errors.address}
                  className={classnames("", {
                    invalid: errors.address
                  })}
                />
                <span className="red-text">{errors.address}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Data Nascimento *</label><br></br>
                <input
                  onChange={e => this.setState({
                    birthDate: e.target.value,
                    validationErrorBirthDate: e.target.value === "" ? "Dever?? preencher o campo Data Nascimento" : ""
                  })}
                  value={this.state.birthDate}
                  id="birthDate"
                  type="date"
                  error={errors.birthDate}
                  className={classnames("", {
                    invalid: errors.birthDate
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorBirthDate}
                </div>
                <span className="red-text">{errors.birthDate}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Membro da Comunidade IPS *</label><br></br>
                <select onChange={this.onChange}
                  value={this.state.memberIPS}
                  error={errors.memberIPS}
                  id="memberIPS"
                  type="text"
                  className={classnames("", {
                    invalid: errors.memberIPS
                  })}>
                  <option value="" disabled>Selecionar Op????o</option>
                  <option value="Estudante">Estudante</option>
                  <option value="Diplomado">Diplomado</option>
                  <option value="Docente">Docente</option>
                  <option value="N??o Docente">N??o Docente</option>
                  <option value="Bolseiro">Bolseiro</option>
                  <option value="Aposentado">Aposentado</option>
                </select>
                <span className="red-text">{errors.memberIPS}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Escola/Servi??o *</label><br></br>
                <select onChange={this.onChange}
                  value={this.state.schoolIPS}
                  id="schoolIPS"
                  type="text"
                  error={errors.schoolIPS}
                  className={classnames("", {
                    invalid: errors.schoolIPS
                  })}>
                  <option value="" disabled>Selecionar Op????o</option>
                  <option value="EST-Set??bal">Escola Superior de Tecnologia de Set??bal</option>
                  <option value="ESE">Escola Superior de Educa????o</option>
                  <option value="ESCE">Escola Superior de Ci??ncias Empresariais</option>
                  <option value="ESS">Escola Superior de Sa??de</option>
                  <option value="EST-Barreiro">Escola Superior de Tecnologia do Barreiro</option>
                </select>
                <span className="red-text">{errors.schoolIPS}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Curso/Forma????o em</label><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.courseIPS}
                  error={errors.courseIPS}
                  id="courseIPS"
                  type="text"
                  className={classnames("", {
                    invalid: errors.courseIPS
                  })}
                />
                <span className="red-text">{errors.courseIPS}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">??reas Interesse *</label><br></br>
                <select required multiple={true} value={this.state.interestAreas} onChange={this.handleChangeInterestAreas}
                  error={errors.interestAreas}
                  className={classnames("", {
                    invalid: errors.interestAreas
                  })}>
                  <option value="" disabled>Selecionar Op????es</option>
                  <option value="Atividades Acad??micas">Atividades Acad??micas (por ex. apoio ??s matr??culas???)</option>
                  <option value="Ambiental">Ambiental (por ex. a????es de sensibiliza????o, de limpeza???)</option>
                  <option value="Apoio a Eventos">Apoio a Eventos</option>
                  <option value="Inform??tica">Inform??tica (por ex. cria????o de sites, de bases de dados, forma????o???)</option>
                  <option value="Comunica????o">Comunica????o (por ex. divulga????o nas Escolas Secund??rias/Profissionais, Futur??lia???)</option>
                  <option value="Cultural">Cultural (por ex. teatro; m??sica...)</option>
                  <option value="Desporto">Desporto (por ex. apoio a eventos desportivos, caminhadas???)</option>
                  <option value="Educa????o">Educa????o (por ex. estudo acompanhado, alfabetiza????o???)</option>
                  <option value="Sa??de">Sa??de (por ex. rastreios, a????es de sensibiliza????o???)</option>
                  <option value="Social">Social (por ex. apoio a idosos, a crian??as, Banco Alimentar???)</option>
                </select>
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorInterestAreas}
                </div>
                <span className="red-text">{errors.interestAreas}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Raz??es para querer ser volunt??rio *</label><br></br>
                <select required multiple={true} value={this.state.reasons} onChange={this.handleChangeReasons}
                  error={errors.reasons}
                  className={classnames("", {
                    invalid: errors.reasons
                  })}>
                  <option value="" disabled>Selecionar Op????es</option>
                  <option value="Conv??vio Social">Pelo conv??vio social</option>
                  <option value="Futuro Profissional">Porque pode ser vantajoso para o futuro profissional</option>
                  <option value="Integra????o Social">Pela possibilidade de integra????o social</option>
                  <option value="Novas Experi??ncias">Para ter novas experi??ncias</option>
                  <option value="Ajudar os Outros">Porque gosto de ajudar os outros</option>
                  <option value="Incentivado por outros">Porque fui incentivado(a) por outras pessoas</option>
                  <option value="Conhece pessoas que tamb??m est??o/estiveram no voluntariado">Porque conhe??o pessoas que j?? realizaram atividades de voluntariado no IPS</option>
                  <option value="Sentir-se ??til">Para me sentir ??til</option>
                  <option value="Ocupar Tempo Livre">Para ocupar tempo livre</option>
                  <option value="Outro">Outro</option>
                </select>
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorReasons}
                </div>
                <span className="red-text">{errors.reasons}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Observa????es</label><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.observations}
                  id="observations"
                  type="text"
                  error={errors.observations}
                  className={classnames("", {
                    invalid: errors.observations
                  })}
                />
                <span className="red-text">{errors.observations}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Log??tipo</label><br></br><br></br>
                <Upload handleUpload={this.handleUpload} ></Upload>
              </div>

            </form>
            <div className="botoes col s12" style={{ marginTop: "auto", marginBottom: 70, display: "flex", justifyContent: "space-around"}}>
              <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5}}
                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Submeter
              </button>
              <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, backgroundColor: "red"}}
                onClick={this.goBack} className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditVoluntary.propTypes = {
  editUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editUser }
)(EditVoluntary);
