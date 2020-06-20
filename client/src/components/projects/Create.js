import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";
import M from "materialize-css";
import options from "materialize-css";
import axios from 'axios';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      synopsis: "",
      intervationArea: "",
      target_audience: "",
      objectives: "",
      description: "",
      requiredFormation: false,
      formation: "",
      date: "",
      interestAreas: [],
      photo: "",
      relatedEntities: [],
      observations: "",
      authorization: false,
      users: [],
      selectedUser: "",
      errors: {}
    }

    this.handleChangeInterestAreas = this.handleChangeInterestAreas.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onChangeRelatedEntities = this.onChangeRelatedEntities.bind(this);
    this.onChange = this.onChange.bind(this);
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
    axios.get('/api/admin/getCompanyUsers')
      .then(response => {
        this.setState({
          users: response.data,
          selectedUser: response.data[0].name
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  uploadFile(event) {
    console.log(event.target.files[0]);

    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', 'some value user types');
    data.append('description', 'some value user types');

  }

  toggleChangeAuthorization = () => {
    this.setState({
      authorization: !this.state.authorization,
    });
  }

  toggleChangeRequiredFormation = () => {
    this.setState({
      requiredFormation: !this.state.requiredFormation,
    });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChangeInterestAreas(event) {
    this.setState({ interestAreas: Array.from(event.target.selectedOptions, (item) => item.value) });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  goBack() {
    window.history.back();
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      title: this.state.title,
      synopsis: this.state.synopsis,
      intervationArea: this.state.intervationArea,
      target_audience: this.state.target_audience,
      objectives: this.state.objectives,
      description: this.state.description,
      requiredFormation: this.state.requiredFormation,
      formation: this.state.formation,
      date: this.state.date,
      interestAreas: this.state.interestAreas,
      photo: this.state.photo,
      observations: this.state.observations,
      authorization: this.state.authorization,
      relatedEntities: this.state.relatedEntities,
      responsibleID: this.state.selectedUser
    };

    this.props.createProject(obj, this.props.history);

  }

  onChangeRelatedEntities = e => {
    var input = e.target.value;
    var point = ",";
    var inputList = input.split(point);
    this.setState({ [e.target.id]: inputList });
  };

  render() {
    const { errors } = this.state;

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      M.FormSelect.init(elems, options);
    });

    let optionTemplate = this.state.users.map(v => (
      <option key={v.email} value={v.name}>{v.name}</option>
    ));

    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">

            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h3>Criar Projeto</h3>
            </div>

            <form noValidate>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  error={errors.title}
                  id="title"
                  type="text"
                  className={classnames("", {
                    invalid: errors.title
                  })}
                />
                <label htmlFor="name">Designação do Projeto/Atividade *</label>
                <span className="red-text">{errors.title}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.synopsis}
                  error={errors.synopsis}
                  id="synopsis"
                  type="text"
                  className={classnames("", {
                    invalid: errors.synopsis
                  })}
                />
                <label htmlFor="name">Resumo do Projeto/Atividade *</label>
                <span className="red-text">{errors.synopsis}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.intervationArea}
                  error={errors.intervationArea}
                  id="intervationArea"
                  type="text"
                  className={classnames("", {
                    invalid: errors.intervationArea
                  })}
                />
                <label htmlFor="name">Área de Intervenção *</label>
                <span className="red-text">{errors.intervationArea}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.target_audience}
                  error={errors.target_audience}
                  id="target_audience"
                  type="text"
                  className={classnames("", {
                    invalid: errors.target_audience
                  })}
                />
                <label htmlFor="name">Público Alvo (Beneficiários) *</label>
                <span className="red-text">{errors.target_audience}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.objectives}
                  error={errors.objectives}
                  id="objectives"
                  type="text"
                  className={classnames("", {
                    invalid: errors.objectives
                  })}
                />
                <label htmlFor="name">Objetivos</label>
                <span className="red-text">{errors.objectives}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.description}
                  error={errors.description}
                  id="description"
                  type="text"
                  className={classnames("", {
                    invalid: errors.description
                  })}
                />
                <label htmlFor="name">Descrição das Atividades *</label>
                <span className="red-text">{errors.description}</span>
              </div>

              <div className="input-field col s12">
                <b>Exigência de formação específica **</b>
                <p>
                  <label>
                    <input type="checkbox" checked={this.state.requiredFormation} onChange={this.toggleChangeRequiredFormation} />
                    <span>Sim</span>
                  </label>
                </p>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.formation}
                  id="formation"
                  type="text"
                />
                <label htmlFor="name">Se <b>sim</b>, Que tipo de formação ? **</label>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Data/Horário Previsto *</label><br></br><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.date}
                  error={errors.date}
                  id="date"
                  type="datetime-local"
                  className={classnames("", {
                    invalid: errors.date
                  })}
                />
                <span className="red-text">{errors.date}</span>
              </div>

              <div className="input-field col s12">
                <label>Para a concretização do Projeto/Atividades, em que áreas necessita de voluntários*</label><br></br>
                <select required multiple={true} value={this.state.interestAreas} onChange={this.handleChangeInterestAreas}
                  error={errors.interestAreas}
                  className={classnames("", {
                    invalid: errors.interestAreas
                  })}>
                  <option value="" disabled>Selecionar Opções</option>
                  <option value="Atividades Académicas">Atividades Académicas (por ex. apoio às matrículas…)</option>
                  <option value="Ambiental">Ambiental (por ex. ações de sensibilização, de limpeza…</option>
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

              <div className="input-field col s12">
                <label>Responsável*</label><br></br><br></br>
                <select value={this.state.selectedUser} onChange={this.onChange}
                  error={errors.selectedUser}
                  className="browser-default"
                  id="selectedUser"
                  type="text">
                  {optionTemplate}
                </select>
                <span className="red-text">{errors.selectedUser}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.observations}
                  id="observations"
                  type="text"
                />
                <label htmlFor="name">Observações</label>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChangeRelatedEntities}
                  value={this.state.relatedEntities}
                  id="relatedEntities"
                  type="text"
                />
                <label htmlFor="name">Entidades Envolvidas (ex: Siemens, Google, Vodafone)</label>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Logótipo</label><br></br><br></br>
                <input
                  accept="image/*"
                  type="file"
                  className="inputfile"
                  onChange={this.uploadFile}
                />
              </div>

              <div className="input-field col s12">
                <b>Autorização RGPD *</b>
                <label>
                  <br></br>
                  <input type="checkbox" checked={this.state.authorization} onChange={this.toggleChangeAuthorization} />
                  <span>Consinto, ao abrigo do Regulamento Geral de Proteção de Dados (RGPD), a utilização dos meus dados pessoais, fornecidos no formulário, ficando informado/a do direito a retirar o consentimento a qualquer momento e que o tratamento de dados é da responsabilidade do IPS, sendo-lhe aplicada a Política de Proteção de Dados do IPS.</span>
                  <br></br>
                  <a href="http://www.si.ips.pt/ips_si/web_base.gera_pagina?P_pagina=40723" rel="noopener noreferrer" target="_blank">(Disponível aqui)</a>
                </label>
              </div>
            </form>
            <div className="col s12" style={{ marginTop: "1%", paddingBottom: 60 }}>
              <br></br><br></br><br></br><br></br><br></br>
              <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, marginLeft: "16%" }}
                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Submeter
              </button>
              <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, backgroundColor: "red", marginRight: "16%" }}
                onClick={this.goBack} className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar
              </button>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

Create.propTypes = {
  createProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProject }
)(Create);
