import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import M from "materialize-css";
import options from "materialize-css";

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
    }

    this.handleChangeInterestAreas = this.handleChangeInterestAreas.bind(this);
    this.onChangeRelatedEntities = this.onChangeRelatedEntities.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/api/projects/editProject/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          title: response.data.title,
          synopsis: response.data.synopsis,
          intervationArea: response.data.intervationArea,
          target_audience: response.data.target_audience,
          objectives: response.data.objectives,
          description: response.data.description,
          date: response.data.date,
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
    this.setState({ [e.target.id]: inputList});
    console.log(this.state.relatedEntities);
  };

  render() {
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
                  onClick={this.onSubmit}
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
        </div>
      </div>
    )
  }
}