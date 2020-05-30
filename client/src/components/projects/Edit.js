import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
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
      requiredFormation: false,
      formation: "",
      date: "",
      interestAreas: [],
      photo: "",
      relatedEntities: [],
      observations: "",
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/projects/editProject/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          synopsis: response.data.synopsis,
          intervationArea: response.data.intervationArea,
          target_audience: response.data.taget,
          objectives: response.data.objectives,
          description: response.data.description,
          requiredFormation: response.data.requiredFormation,
          formation: response.data.formation,
          date: response.data.date,
          interestAreas: response.data.interestAreas,
          photo: response.data.photo,
          relatedEntities: response.data.relatedEntities,
          observations: response.data.observations,
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
      contact_person: this.state.contact_person,
      email_person: this.state.email_person,
      phone_person: this.state.phone_person,
      synopsis: this.state.synopsis,
      target_audience: this.state.target_audience,
      objectives: this.state.objectives,
      date: this.state.date,
      areas: this.state.areas,
      description: this.state.description,
      related_entities: this.state.related_entities,
      observations: this.state.observations,
      authorization: this.state.authorization,
      user_in_charge: this.user_in_charge
    };
    axios.post('/api/projects/updateProject/' + this.props.match.params.id, obj)
      .then(res => console.log(res.data));
    this.props.history.push('/listProjects');
    window.location.reload();
  }

  render() {
    return (
      <div style={{ height: "75vh", marginTop: "5%" }} className="container">
        <h3 align="left">Editar Detalhes</h3>
        <form noValidate>
          <div className="input-field col s12">
          <label>Designação do Projeto/Atividade *</label><br></br><br></br>
            <input
              onChange={this.onChange}
              value={this.state.title}
              id="title"
              type="text"
            />
          </div>

          <div className="input-field col s12">
          <label>Resumo do Projeto/Atividade *</label><br></br><br></br>
            <input
              onChange={this.onChange}
              value={this.state.synopsis}
              id="synopsis"
              type="text"
            />
          </div>

          <div className="input-field col s12">
          <label>Área de Intervenção *</label><br></br><br></br>
            <input
              onChange={this.onChange}
              value={this.state.intervationArea}
              id="intervationArea"
              type="text"
            />
          </div>

          <div className="input-field col s12">
          <label>Público Alvo (Beneficiários) *</label><br></br><br></br>
            <input
              onChange={this.onChange}
              value={this.state.target_audience}
              id="target_audience"
              type="text"
            />
          </div>

          <div className="input-field col s12">
          <label>Objetivos</label><br></br><br></br>
            <input
              onChange={this.onChange}
              value={this.state.objectives}
              id="objectives"
              type="text"
            />
          </div>

          <div className="input-field col s12">
          <label>Descrição das Atividades *</label><br></br><br></br>
            <input
              onChange={this.onChange}
              value={this.state.description}
              id="description"
              type="text"
            />
          </div>

          <div className="input-field col s12">
            <b>Exigência de formação específica* *</b>
            <p>
              <label>
                <input type="checkbox" checked={this.state.requiredFormation} onChange={this.toggleChangeRequiredFormation} />
                <span>Sim</span>
              </label>
            </p>
          </div>

          <div className="input-field col s12">
          <label>Se <b>sim</b>, Que tipo de formação ? *</label><br></br>
            <input
              onChange={this.onChange}
              value={this.state.formation}
              id="formation"
              type="text"
            />
          </div>

          <div className="input-field col s12">
            <label htmlFor="name">Data/Horário Previsto *</label><br></br><br></br>
            <input
              onChange={this.onChange}
              value={this.state.date}
              id="date"
              type="datetime-local"
            />
          </div>

          <div className="input-field col s12">
            <label>Para a concretização do Projeto/Atividades, em que áreas necessita de voluntários*</label><br></br><br></br>
            <select multiple={true} value={this.state.interestAreas} onChange={this.handleChangeInterestAreas} className='dropdown-content'>
              <option disabled>Selecionar Opções</option>
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
          </div>

          <div className="input-field col s12">
          <label>Observações</label><br></br><br></br>
            <input
              onChange={this.onChange}
              value={this.state.observations}
              id="observations"
              type="text"
            />
          </div>

          <div className="input-field col s12">
          <label>Entidades Envolvidas (ex: Siemens, Google, Vodafone)</label><br></br><br></br>
            <input
              onChange={this.onChangeRelatedEntities}
              value={this.state.relatedEntities}
              id="relatedEntities"
              type="text"
            />
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
        <div className="col s12 center-align row" style={{ paddingBottom: 60 }}>
          <div className="col s6">
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                backgroundColor: "green"
              }}
              type="submit"
              className="btn btn-large waves-effect waves-light hoverable accent-3">
              Submeter
                </button>
          </div>
          <div className="col s6">
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                backgroundColor: "red"
              }}
              className="btn btn-large waves-effect waves-light hoverable accent-3">
              <Link to="/listProjects" style={{ color: "white" }}>Cancelar</Link>
            </button>
          </div>
        </div>
      </div>
    )
  }
}