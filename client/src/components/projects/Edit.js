import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import options from "materialize-css";
import classnames from "classnames";

export default class Edit extends Component {
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
    axios.get('/api/projects/editProject/' + this.props.match.params.id)
      .then(response => {
        var pdate = new Date(response.data.date);
        var year = pdate.getFullYear();
        var month = pdate.getMonth();
        var day = pdate.getDate();
        var mm = month < 10 ? '0' + month : month;
        var dd = day < 10 ? '0' + day: day;
        var hour = pdate.getHours();
        var minutes = pdate.getMinutes();
        var hh =  hour < 10 ? '0' + hour : hour;
        var mmm = minutes < 10 ? '0' + minutes : minutes;
        pdate = '' + year + "-" + mm + "-" + dd + "T" + hh + ":" + mmm;
        this.setState({
          title: response.data.title,
          synopsis: response.data.synopsis,
          intervationArea: response.data.intervationArea,
          target_audience: response.data.target_audience,
          objectives: response.data.objectives,
          description: response.data.description,
          date: pdate,
          interestAreas: response.data.interestAreas,
          photo: response.data.photo,
          observations: response.data.observations,
          relatedEntities: response.data.relatedEntities
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit(e) {
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
      relatedEntities: this.state.relatedEntities
    };

    axios.post('/api/projects/updateProject/' + this.props.match.params.id, obj)
      .then(res => console.log(res.data));
    this.props.history.push('/listProjects');
    window.location.reload();
  }

  handleChangeInterestAreas(event) {
    this.setState({ interestAreas: Array.from(event.target.selectedOptions, (item) => item.value) });
    console.log(this.state.interestAreas);
  }

  onChangeRelatedEntities = e => {
    var input = e.target.value;
    var point = ",";
    var inputList = input.split(point);
    console.log(inputList);
    this.setState({ [e.target.id]: inputList });
    console.log(this.state.relatedEntities);
  };

  render() {
    const { errors } = this.state;

    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);
      console.log(instances);
    });

    return (
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="row">
          <div className="col s8 offset-s2">
            <h3 align="left">Editar Detalhes</h3>
            <form noValidate>
              <div className="input-field col s12">
                <label>Designação do Projeto/Atividade *</label><br></br><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  id="title"
                  type="text"
                  error={errors.title}
                  className={classnames("", {
                    invalid: errors.title
                  })}
                />
                <span className="red-text">{errors.title}</span>
              </div>

              <div className="input-field col s12">
                <label>Resumo do Projeto/Atividade *</label><br></br><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.synopsis}
                  id="synopsis"
                  type="text"
                  error={errors.synopsis}
                  className={classnames("", {
                    invalid: errors.synopsis
                  })}
                />
                <span className="red-text">{errors.synopsis}</span>
              </div>

              <div className="input-field col s12">
                <label>Área de Intervenção *</label><br></br><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.intervationArea}
                  id="intervationArea"
                  type="text"
                  error={errors.intervationArea}
                  className={classnames("", {
                    invalid: errors.intervationArea
                  })}
                />
                <span className="red-text">{errors.intervationArea}</span>
              </div>

              <div className="input-field col s12">
                <label>Público Alvo (Beneficiários) *</label><br></br><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.target_audience}
                  id="target_audience"
                  type="text"
                  error={errors.target_audience}
                  className={classnames("", {
                    invalid: errors.target_audience
                  })}
                />
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
                  onChange={this.onChange}
                  value={this.state.description}
                  id="description"
                  type="text"
                  error={errors.description}
                  className={classnames("", {
                    invalid: errors.description
                  })}
                />
                <span className="red-text">{errors.description}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Data/Horário Previsto *</label><br></br><br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.date}
                  id="date"
                  type="datetime-local"
                  error={errors.date}
                  className={classnames("", {
                    invalid: errors.date
                  })}
                />
                <span className="red-text">{errors.description}</span>
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
                <span className="red-text">{errors.interestAreas}</span>
              </div>

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
                <label htmlFor="name">Logótipo</label><br></br><br></br>
                <input
                  accept="image/*"
                  type="file"
                  className="inputfile"
                  onChange={this.uploadFile}
                />
              </div>
            </form>
            <div className="col s12" style={{ marginTop: "1%", paddingBottom: 60 }}>
              <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, marginLeft: "16%" }}
                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Submeter
              </button>
              <a style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, backgroundColor: "red", marginRight: "16%" }}
                href="/listProjects" className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar
              </a>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

