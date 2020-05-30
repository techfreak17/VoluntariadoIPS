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
      userID: this.props.auth.user.id,
      errors: {}
    }

    this.handleChangeInterestAreas = this.handleChangeInterestAreas.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.onChangeRelatedEntities = this.onChangeRelatedEntities.bind(this);
  }

  /**componentDidMount() {
    axios.get('/api/projects/getCompanies')
      .then(response => {
        this.setState({
          relatedEntities: (response.data)
        });
        console.log(this.state.companies);
      })
      .catch(function (error) {
        console.log(error);
      })
  }*/

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

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.relatedEntities);
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
      userID: this.state.userID
    };

    this.props.createProject(obj, this.props.history);

    this.setState({
      title: "",
      synopsis: "",
      intervationArea: "",
      target_audience: "",
      objectives: "",
      description: "",
      requiredFormation: "",
      formation: "",
      date: "",
      interestAreas: [],
      observations: "",
      photo: "",
      authorization: "",
      relatedEntities: "",
      errors: {}
    })
  }

  /*
  addCompany(e){
    e.preventDefault();
    this.setState({relatedEntities: [...this.state.relatedEntities,""]})
  }

  handleChange(e,index){
    this.state.relatedEntities[index] = e.target.value
    this.setState({relatedEntities: this.state.relatedEntities})
  }

  handleRemove(e,index){
    e.preventDefault();
    this.state.relatedEntities.splice(index,1)
    console.log(this.state.relatedEntities)
    this.setState({relatedEntities: this.state.relatedEntities})
  }

  handleSubmit(e){
    e.preventDefault();
   console.log(this.state);
  }*/

  onChangeRelatedEntities = e => {
    var input = e.target.value;
    var point = ",";
    var semiColon = ";";
    var space = " ";
    var inputList = input.split(point); 
    var inputList = input.split(semiColon); 
    var inputList = input.split(space); 
    console.log(inputList);
    this.setState({ [e.target.id]: inputList});
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

            <a href="/listProjects" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>Voltar
            </a>

            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h3 align="left">Propor Projeto</h3>
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
                <b>Exigência de formação específica* *</b>
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
                  error={errors.formation}
                  id="formation"
                  type="text"
                  className={classnames("", {
                    invalid: errors.formation
                  })}
                />
                <label htmlFor="name">Se <b>sim</b>, Que tipo de formação ? *</label>
                <span className="red-text">{errors.formation}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Data/Horário Previsto *</label><br></br><br></br>
                <span className="red-text">{errors.date}</span>
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
              </div>

              <div className="input-field col s12">
                <label>Para a concretização do Projeto/Atividades, em que áreas necessita de voluntários*</label><br></br><br></br>
                <select multiple={true} value={this.state.interestAreas} onChange={this.handleChangeInterestAreas}
                  error={errors.interestAreas} className='dropdown-content'>
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
                <span className="red-text">{errors.interestAreas}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.observations}
                  error={errors.observations}
                  id="observations"
                  type="text"
                  className={classnames("", {
                    invalid: errors.observations
                  })}
                />
                <label htmlFor="name">Observações</label>
                <span className="red-text">{errors.observations}</span>
              </div>

              {/*
              <div className="input-field col s12">
                <label>Entidades Envolvidas</label><br></br><br></br>
               {
                 this.state.relatedEntities.map((company,index)=>{
                   return(
                       <div key={index}>
                         <input onChange= {(e)=>this.handleChange(e,index)} value={company}></input>
                         <button onClick= {(e)=>this.handleRemove(e,index)}>Remove</button>
                       </div>
                   )
                 })
               }
               <br></br>
               <button onClick={(e)=>this.addCompany(e)}>Add Company</button><br></br><br></br>

               <button onClick= {(e)=>this.handleSubmit(e)}>Submit</button>
              </div>
              */}

              <div className="input-field col s12">
                <input
                  onChange={this.onChangeRelatedEntities}
                  value={this.state.relatedEntities}
                  error={errors.relatedEntities}
                  id="relatedEntities"
                  type="text"
                  className={classnames("", {
                    invalid: errors.relatedEntities
                  })}
                />
                <label htmlFor="name">Entidades Envolvidas (ex: Siemens, Google, Vodafone)</label>
                <span className="red-text">{errors.objectives}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Logótipo</label><br></br><br></br>
                <span className="red-text">{errors.photo}</span>
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
            <div className="col s12" style={{ paddingLeft: "11.250px", paddingBottom: "60px" }}>
              <br></br><br></br><br></br><br></br><br></br>
              <button style={{ width: "150px", borderRadius: 10, letterSpacing: "1.5px", marginTop: "1rem" }}
                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Registar
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
