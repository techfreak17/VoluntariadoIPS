import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import options from "materialize-css";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProfile } from "../../actions/profileActions";
import Upload from "../upload/Upload";
import "../../componentsCSS/Forms.css";

class EditProfileVoluntary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      address: "",
      birthDate: "",
      password: "",
      password2: "",
      interestAreas: [],
      reasons: [],
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
          phone: response.data[1].phone,
          address: response.data[1].address,
          memberIPS: response.data[1].memberIPS,
          schoolIPS: response.data[1].schoolIPS,
          courseIPS: response.data[1].courseIPS,
          interestAreas: response.data[1].interestAreas,
          reasons: response.data[1].reasons,
          role: response.data[0].role,
          birthDate: date
        });
      })
      .catch(error => console.log(error));
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChangeInterestAreas(event) {
    this.setState({
      interestAreas: Array.from(event.target.selectedOptions, (item) => item.value)
    });
  }

  handleChangeReasons(event) {
    this.setState({
      reasons: Array.from(event.target.selectedOptions, (item) => item.value)
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      interestAreas: this.state.interestAreas,
      reasons: this.state.reasons,
      birthDate: this.state.birthDate,
      role: this.state.role,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.editProfile(this.props.match.params.id, this.state.fileFormData, obj, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
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
        <div className="container">
          <h3>Editar Detalhes</h3>
          <form noValidate>
            <div className="input-field">
              <label htmlFor="name">Nome Completo</label><br></br>
              <input
                onChange={e => this.setState({
                  name: e.target.value,
                })}
                value={this.state.name}
                id="name"
                type="text"
                error={errors.name}
                className={classnames("", {
                  invalid: errors.name
                })}
              />
              <span className="red-text">{errors.name}</span>
            </div>

            <div className="input-field">
              <label htmlFor="number">Nº Telemóvel</label><br></br>
              <input
                onChange={e => this.setState({
                  phone: e.target.value,
                })}
                value={this.state.phone}
                id="phone"
                type="number"
                error={errors.phone}
                className={classnames("", {
                  invalid: errors.phone
                })}
              />
              <span className="red-text">{errors.phone}</span>
            </div>

            <div className="input-field">
              <label htmlFor="name">Morada (Concelho)</label><br></br>
              <input
                onChange={e => this.setState({
                  address: e.target.value,
                })}
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

            <div className="input-field">
              <label htmlFor="name">Data Nascimento</label><br></br>
              <input
                onChange={e => this.setState({
                  birthDate: e.target.value,
                })}
                value={this.state.birthDate}
                id="birthDate"
                type="date"
                error={errors.birthDate}
                className={classnames("", {
                  invalid: errors.birthDate
                })}
              />
              <span className="red-text">{errors.birthDate}</span>
            </div>

            <div className="input-field">
              <label htmlFor="name">Áreas Interesse *</label><br></br>
              <select required multiple={true} value={this.state.interestAreas} onChange={this.handleChangeInterestAreas}
                error={errors.interestAreas}
                className={classnames("", {
                  invalid: errors.interestAreas
                })}>
                <option value="" disabled>Selecionar Opções</option>
                <option value="Atividades Académicas">Atividades Académicas (por ex. apoio às matrículas…)</option>
                <option value="Ambiental">Ambiental (por ex. ações de sensibilização, de limpeza…)</option>
                <option value="Apoio a Eventos">Apoio a Eventos</option>
                <option value="Informática">Informática (por ex. criação de sites, de bases de dados, formação…)</option>
                <option value="Comunicação">Comunicação (por ex. divulgação nas Escolas Secundárias/Profissionais, Futurália…)</option>
                <option value="Cultural">Cultural (por ex. teatro; música...)</option>
                <option value="Desporto">Desporto (por ex. apoio a eventos desportivos, caminhadas…)</option>
                <option value="Educação">Educação (por ex. estudo acompanhado, alfabetização…)</option>
                <option value="Saúde">Saúde (por ex. rastreios, ações de sensibilização…)</option>
                <option value="Social">Social (por ex. apoio a idosos, a crianças, Banco Alimentar…)</option>
              </select>
              <span className="red-text">{errors.interestAreas}</span>
            </div>

            <div className="input-field">
              <label htmlFor="name">Razões para querer ser voluntário *</label><br></br>
              <select required multiple={true} value={this.state.reasons} onChange={this.handleChangeReasons}
                error={errors.reasons}
                className={classnames("", {
                  invalid: errors.reasons
                })}>
                <option value="" disabled>Selecionar Opções</option>
                <option value="Convívio Social">Pelo convívio social</option>
                <option value="Futuro Profissional">Porque pode ser vantajoso para o futuro profissional</option>
                <option value="Integração Social">Pela possibilidade de integração social</option>
                <option value="Novas Experiências">Para ter novas experiências</option>
                <option value="Ajudar os Outros">Porque gosto de ajudar os outros</option>
                <option value="Incentivado por outros">Porque fui incentivado(a) por outras pessoas</option>
                <option value="Conhece pessoas que também estão/estiveram no voluntariado">Porque conheço pessoas que já realizaram atividades de voluntariado no IPS</option>
                <option value="Sentir-se Útil">Para me sentir útil</option>
                <option value="Ocupar Tempo Livre">Para ocupar tempo livre</option>
                <option value="Outro">Outro</option>
              </select>
              <span className="red-text">{errors.reasons}</span>
            </div>

            <div className="input-field">
              <input
                onChange={e => this.setState({
                  password: e.target.value,
                })}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password
                })}
              />
              <label htmlFor="password">Password Atual (Preencher apenas se pretender alterar a password)</label>
              <span className="red-text">{errors.password}</span>
            </div>

            <div className="input-field">
              <input
                onChange={e => this.setState({
                  password2: e.target.value,
                })}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("", {
                  invalid: errors.password2
                })}
              />
              <label htmlFor="password2">Password Nova (Preencher apenas se pretender alterar a password)</label>
              <span className="red-text">{errors.password2}</span>
            </div>
            
            <div className="input-field col s12">
              <label htmlFor="name">Logótipo</label><br></br><br></br>
              <Upload handleUpload={this.handleUpload}></Upload>
            </div>
          </form>
          <div className="botoes col s12" style={{ marginTop: "auto", marginBottom: 70, display: "flex", justifyContent: "space-around" }}>
            <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5 }}
              type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Submeter
            </button>
            <a style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, backgroundColor: "red" }}
              href={"/baseProfile/" + this.props.match.params.id} className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar
            </a>
          </div>
        </div>
      </div>
    )
  }
}

EditProfileVoluntary.propTypes = {
  editProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editProfile }
)(EditProfileVoluntary);