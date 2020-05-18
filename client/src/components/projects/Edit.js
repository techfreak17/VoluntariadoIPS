import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeSynopsis = this.onChangeSynopsis.bind(this);
    this.onChangeTarget = this.onChangeTarget.bind(this);
    this.onChangeObjectives = this.onChangeObjectives.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeAreas = this.onChangeAreas.bind(this);
    this.onChangeObservations = this.onChangeObservations.bind(this);
    this.onChangeAuthorization = this.onChangeAuthorization.bind(this);
    this.onChangeUserInCharge = this.onChangeUserInCharge.bind(this);
    this.onChangeContactPerson = this.onChangeContactPerson.bind(this);
    this.onChangeEmailPerson = this.onChangeEmailPerson.bind(this);
    this.onChangePhonePerson = this.onChangePhonePerson.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      contact_person: "",
      email_person: "",
      phone_person: "",
      synopsis: "",
      target_audience: "",
      objectives: "",
      date: "",
      areas: "",
      description : "",
      related_entities: "",
      observations: "",
      authorization: "",
      user_in_charge: ""
    }
  }

  componentDidMount() {
      axios.get('/api/projects/editProject/'+ this.props.match.params.id)
          .then(response => {
              this.setState({ 
                title: response.data.title, 
                contact_person: response.data.contact_person,
                email_person: response.data.email_person,
                phone_person: response.data.phone_person,
                synopsis: response.data.synopsis,
                target_audience: response.data.target_audience,
                objectives: response.data.objectives,
                date: response.data.date,
                areas: response.data.areas,
                description: response.data.description,
                related_entities: response.data.related_entities,
                observations: response.data.observations,
                authorization: response.data.authorization,
                user_in_charge: response.data.user_in_charge,
            });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

    onChangeTitle(e) {
      this.setState({
          title: e.target.value
      });
    }
    onChangeSynopsis(e) {
      this.setState({
          synopsis: e.target.value
      })  
    }
    onChangeTarget(e) {
      this.setState({
          target_audience: e.target.value
      })
    }
    onChangeObjectives(e) {
      this.setState({
          objectives: e.target.value
      })
    }
    onChangeDescription(e) {
      this.setState({
          description: e.target.value
      })
    }
    onChangeDate(e) {
      this.setState({
          date: e.target.value
      })
    }
    onChangeAreas(e) {
      this.setState({
          areas: e.target.value
      })
    }
    onChangeRelatedEntities(e) {
      this.setState({
          related_entities: e.target.value
      })
    }
    onChangeObservations(e) {
      this.setState({
          observations: e.target.value
      })
    }
    onChangeAuthorization(e) {
      this.setState({
          authorization: e.target.value
      })
    }
    onChangeUserInCharge(e) {
      this.setState({
          user_in_charge: e.target.value
      })
    }
    onChangeContactPerson(e) {
      this.setState({
        contact_person: e.target.value
      })
    }
    onChangeEmailPerson(e) {
      this.setState({
        email_person: e.target.value
      })
    }
    onChangePhonePerson(e) {
      this.setState({
        phone_person: e.target.value
      })
    }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      title: this.state.title,
      contact_person: this.state.contact_person,
      email_person: this.state.email_person,
      phone_person: this.state.phone_person,
      synopsis: this.state.synopsis,
      target_audience: this.state.target,
      objectives: this.state.objectives,
      date: this.state.date,
      areas: this.state.areas,
      description: this.state.need_training,
      related_entities: this.state.related_entities,
      observations: this.state.observations,
      authorization: this.state.authorization,
      user_in_charge: this.user_in_charge
    };
    axios.post('/api/projects/updateProject/' + this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/listProjects');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="left">Editar Detalhes</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Nome do Projeto:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      />
                </div>
                <div className="form-group">
                    <label>Pessoa de Contacto: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.contact_person}
                      onChange={this.onChangeContactPerson}
                      />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email" 
                      className="form-control"
                      value={this.state.email_person}
                      onChange={this.onChangeEmailPerson}
                      />
                </div>
                <div className="form-group">
                    <label>Telemóvel: </label>
                    <input type="number" 
                      className="form-control"
                      value={this.state.phone_person}
                      onChange={this.onChangePhonePerson}
                      />
                </div>
                <div className="form-group">
                    <label>Resumo do Projeto: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.synopsis}
                      onChange={this.onChangeSynopsis}
                      />
                </div>
                <div className="form-group">
                    <label>Áreas Intervenção: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.areas}
                      onChange={this.onChangeAreas}
                      />
                </div>
                <div className="form-group">
                    <label>Público Alvo: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.target_audience}
                      onChange={this.onChangeTarget}
                      />
                </div>
                <div className="form-group">
                    <label>Objetivos: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.objectives}
                      onChange={this.onChangeObjectives}
                      />
                </div>
                <div className="form-group">
                    <label>Descrição das Atividades: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      />
                </div>
                <div className="form-group">
                    <label>Observações </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.observations}
                      onChange={this.onChangeObservations}
                      />
                </div>
                <div className="form-group">
                    <label>Data </label>
                    <input type="date" 
                      className="form-control"
                      value={this.state.date}
                      onChange={this.onChangeDate}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Submeter" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}