import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import options from "materialize-css";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Upload from "../upload/Upload";
import { editProject } from "../../actions/projectActions";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      synopsis: "",
      intervationArea: "",
      target_audience: "",
      objectives: "",
      description: "",
      date: "",
      interestAreas: [],
      photo: "",
      observations: "",
      relatedEntities: [],
      users: [],
      selectedUser: "",
      vacancies: "",
      fileFormData: null,
      errors: {}
    }

    this.handleChangeInterestAreas = this.handleChangeInterestAreas.bind(this);
    this.onChangeRelatedEntities = this.onChangeRelatedEntities.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    axios.all([
      axios.get('/api/projects/editProject/' + this.props.match.params.id),
      axios.get('/api/admin/getCompanyUsers'),
    ])
      .then(responseArr => {
        var pdate = new Date(responseArr[0].data.date);
        var year = pdate.getFullYear();
        var month = pdate.getMonth() + 1;
        var day = pdate.getDate();
        var mm = month < 10 ? '0' + month : month;
        var dd = day < 10 ? '0' + day : day;
        var hour = pdate.getHours();
        var minutes = pdate.getMinutes();
        var hh = hour < 10 ? '0' + hour : hour;
        var mmm = minutes < 10 ? '0' + minutes : minutes;
        pdate = '' + year + "-" + mm + "-" + dd + "T" + hh + ":" + mmm;
        this.setState({
          title: responseArr[0].data.title,
          synopsis: responseArr[0].data.synopsis,
          intervationArea: responseArr[0].data.intervationArea,
          target_audience: responseArr[0].data.target_audience,
          objectives: responseArr[0].data.objectives,
          description: responseArr[0].data.description,
          date: pdate,
          interestAreas: responseArr[0].data.interestAreas,
          photo: responseArr[0].data.photo,
          observations: responseArr[0].data.observations,
          relatedEntities: responseArr[0].data.relatedEntities,
          selectedUser: responseArr[0].data.responsibleID,
          users: responseArr[1].data,
          vacancies: responseArr[0].data.vacancies
        });
      })
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit(e) {
    console.log(this.state.errors);
    e.preventDefault();
    const obj = {
      title: this.state.title,
      synopsis: this.state.synopsis,
      intervationArea: this.state.intervationArea,
      target_audience: this.state.target_audience,
      objectives: this.state.objectives,
      description: this.state.description,
      date: this.state.date,
      interestAreas: this.state.interestAreas,
      photo: this.state.photo,
      observations: this.state.observations,
      relatedEntities: this.state.relatedEntities,
      responsibleID: this.state.selectedUser,
      vacancies: this.state.vacancies
    };

    this.props.editProject(this.props.match.params.id, this.state.fileFormData, obj, this.props.history);
  }

  handleChangeInterestAreas(event) {
    this.setState({
      interestAreas: Array.from(event.target.selectedOptions, (item) => item.value), validationErrorInterestAreas:
        event.target.value === ""
          ? "Deverá preencher o campo Áreas Interesse"
          : ""
    });
  }

  onChangeRelatedEntities = e => {
    var input = e.target.value;
    var point = ",";
    var inputList = input.split(point);
    this.setState({ [e.target.id]: inputList });
  };

  goBack() {
    window.history.back();
  }

  openWarning = () => {
    this.setState({ file: true });
  }
  closeWarning = () => {
    this.setState({ file: false });
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

    let optionTemplate = this.state.users.map(v => (
      <option key={v.email} value={v.responsibleID}>{v.name}</option>
    ));

    return (
      <div className="container" >
        <div className="row">
          <div className="col s8 offset-s2">
            <h3 align="left">Editar Detalhes</h3>
            <p><b>Nota:</b> Todos os campos a * deverão ser preenchidos.</p>
            <form noValidate>
              <div className="input-field col s12">
                <label>Designação do Projeto/Atividade *</label><br></br><br></br>
                <input
                  onChange={e => this.setState({
                    title: e.target.value,
                    validationErrorTitle: e.target.value === "" ? "Deverá preencher o campo Designação do Projeto/Atividade" : ""
                  })}
                  value={this.state.title}
                  id="title"
                  type="text"
                  error={errors.title}
                  className={classnames("", {
                    invalid: errors.title
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorTitle}
                </div>
                <span className="red-text">{errors.title}</span>
              </div>

              <div className="input-field col s12">
                <label>Resumo do Projeto/Atividade *</label><br></br><br></br>
                <input
                  onChange={e => this.setState({
                    synopsis: e.target.value,
                    validationErrorSynopsis: e.target.value === "" ? "Deverá preencher o campo Resumo do Projeto/Atividade" : ""
                  })}
                  value={this.state.synopsis}
                  id="synopsis"
                  type="text"
                  error={errors.synopsis}
                  className={classnames("", {
                    invalid: errors.synopsis
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorSynopsis}
                </div>
                <span className="red-text">{errors.synopsis}</span>
              </div>

              <div className="input-field col s12">
                <label>Área de Intervenção *</label><br></br><br></br>
                <input
                  onChange={e =>
                    this.setState({
                      intervationArea: e.target.value,
                      validationErrorIntervationArea: e.target.value === "" ? "Deverá preencher o campo Área de Intervenção" : ""
                    })}
                  value={this.state.intervationArea}
                  id="intervationArea"
                  type="text"
                  error={errors.intervationArea}
                  className={classnames("", {
                    invalid: errors.intervationArea
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorIntervationArea}
                </div>
                <span className="red-text">{errors.intervationArea}</span>
              </div>

              <div className="input-field col s12">
                <label>Público Alvo (Beneficiários) *</label><br></br><br></br>
                <input
                  onChange={e =>
                    this.setState({
                      target_audience: e.target.value,
                      validationErrorTargetAudience: e.target.value === "" ? "Deverá preencher o campo Público Alvo (Beneficiários)" : ""
                    })}
                  value={this.state.target_audience}
                  id="target_audience"
                  type="text"
                  error={errors.target_audience}
                  className={classnames("", {
                    invalid: errors.target_audience
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorTargetAudience}
                </div>
                <span className="red-text">{errors.target_audience}</span>
              </div>

              <div className="input-field col s12">
                <label>Objetivos</label><br></br><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.objectives}
                  id="objectives"
                  type="text"
                  error={errors.objectives}
                  className={classnames("", {
                    invalid: errors.objectives
                  })}
                />
                <span className="red-text">{errors.objectives}</span>
              </div>

              <div className="input-field col s12">
                <label>Descrição das Atividades *</label><br></br><br></br>
                <input
                  onChange={e =>
                    this.setState({
                      description: e.target.value,
                      validationErrorDescription: e.target.value === "" ? "Deverá preencher o campo Descrição das Atividades" : ""
                    })}
                  value={this.state.description}
                  id="description"
                  type="text"
                  error={errors.description}
                  className={classnames("", {
                    invalid: errors.description
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorDescription}
                </div>
                <span className="red-text">{errors.description}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Data/Horário Previsto *</label><br></br><br></br>
                <input
                  onChange={e => this.setState({
                    date: e.target.value,
                    validationErrorDate: e.target.value === "" ? "Deverá preencher o campo Data/Horário Previsto" : ""
                  })}
                  value={this.state.date}
                  id="date"
                  type="datetime-local"
                  error={errors.date}
                  className={classnames("", {
                    invalid: errors.date
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorDate}
                </div>
                <span className="red-text">{errors.date}</span>
              </div>

              <div className="input-field col s12">
                <label>Para a concretização do Projeto/Atividades, em que áreas necessita de voluntários*</label><br></br><br></br>
                <select multiple={true} value={this.state.interestAreas} onChange={this.handleChangeInterestAreas}
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
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorInterestAreas}
                </div>
                <span className="red-text">{errors.interestAreas}</span>
              </div>

              {(() => {
                if (this.props.auth.user.role === "Administrador") {
                  return (
                    <div>
                      <div className="input-field col s12">
                        <label>Responsável*</label><br></br><br></br>
                        <select value={this.state.selectedUser} onChange={e =>
                          this.setState({
                            selectedUser: e.target.value,
                          })}
                          error={errors.selectedUser}
                          className="browser-default"
                          id="selectedUser"
                          type="text">
                          {optionTemplate}
                        </select>
                        <span className="red-text">{errors.selectedUser}</span>
                      </div>
                    </div>
                  )
                }
              })()}

              <div className="input-field col s12">
                <label>Observações</label><br></br><br></br>
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
                <label>Entidades Envolvidas (ex: Siemens, Google, Vodafone)</label><br></br><br></br>
                <input
                  onChange={this.onChangeRelatedEntities}
                  value={this.state.relatedEntities}
                  id="relatedEntities"
                  type="text"
                  error={errors.relatedEntities}
                  className={classnames("", {
                    invalid: errors.relatedEntities
                  })}
                />
                <span className="red-text">{errors.relatedEntities}</span>
              </div>

              <div className="input-field col s12">
                <label>Nº Máximo de Vagas *</label><br></br><br></br>
                <input
                  onChange={e => this.setState({
                    vacancies: e.target.value,
                    validationErrorVacancies: e.target.value === "" ? "Deverá preencher o campo Nº Máximo de Vagas" : ""
                  })}
                  value={this.state.vacancies}
                  id="vacancies"
                  type="text"
                  error={errors.vacancies}
                  className={classnames("", {
                    invalid: errors.vacancies
                  })}
                />
                <div style={{ color: "red", marginTop: "5px" }}>
                  {this.state.validationErrorVacancies}
                </div>
                <span className="red-text">{errors.vacancies}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Logótipo</label><br></br><br></br>
                <Upload handleUpload={this.handleUpload} isChild={true}></Upload>
              </div>

            </form>
            <div className="col s12" style={{ marginTop: "auto", marginBottom: "10%" }}>
              <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, marginLeft: "20%" }}
                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable accent-3 blue">Submeter
              </button>
              <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, backgroundColor: "red", marginRight: "20%" }}
                onClick={this.goBack} className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar
              </button>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

Edit.propTypes = {
  editProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editProject }
)(Edit);

