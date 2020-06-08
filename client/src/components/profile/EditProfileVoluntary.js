import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import options from "materialize-css";
import classnames from "classnames";

export default class EditProfileVoluntary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
      address: "",
      birthDate: "",
      memberIPS: "",
      schoolIPS: "",
      courseIPS: "",
      password: "",
      password2: "",
      interestAreas: [],
      authorization: false,
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeInterestAreas = this.handleChangeInterestAreas.bind(this);
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
      axios.get('/api/users/getUserDetails/' + this.props.match.params.id),
      axios.get('/api/users/getUser/' + this.props.match.params.id)
    ])
      .then(responseArr => {
        var date = new Date(responseArr[0].data.birthDate);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var d = date.getDate();
        var mm = month < 10 ? '0' + month : month;
        var dd = d < 10 ? '0' + d : d;
        date = '' + year + "-" + mm + "-" + dd;
        this.setState({
          name: responseArr[0].data.name,
          phone: responseArr[0].data.phone,
          address: responseArr[0].data.address,
          memberIPS: responseArr[0].data.memberIPS,
          schoolIPS: responseArr[0].data.schoolIPS,
          courseIPS: responseArr[0].data.courseIPS,
          interestAreas: responseArr[0].data.interestAreas,
          role: responseArr[1].data.role,
          birthDate: date
        });
      })
      .catch(error => console.log(error));
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChangeInterestAreas(event) {
    this.setState({ interestAreas: Array.from(event.target.selectedOptions, (item) => item.value) });
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
      role: this.state.role,
      password: this.state.password,
      password2: this.state.password2,
    };
    axios
      .post('/api/users/updateUser/' + this.props.match.params.id, obj)
    window.location.reload();
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
            <form noValidate>

              <div className="input-field col s12">
                <label htmlFor="name">Nome Completo *</label><br></br>
                <input
                  onChange={this.onChange}
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

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password *</label>
                <span className="red-text">{errors.password}</span>
              </div>

              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirmar Password *</label>
                <span className="red-text">{errors.password2}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="number">Nº Telemóvel *</label><br></br>
                <input
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
                  <option value="" disabled>Selecionar Opção</option>
                  <option value="Estudante">Estudante</option>
                  <option value="Diplomado">Diplomado</option>
                  <option value="Docente">Docente</option>
                  <option value="Não Docente">Não Docente</option>
                  <option value="Bolseiro">Bolseiro</option>
                  <option value="Aposentado">Aposentado</option>
                </select>
                <span className="red-text">{errors.memberIPS}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Escola/Serviço *</label><br></br>
                <select onChange={this.onChange}
                  value={this.state.schoolIPS}
                  id="schoolIPS"
                  type="text"
                  error={errors.schoolIPS}
                  className={classnames("", {
                    invalid: errors.schoolIPS
                  })}>
                  <option value="" disabled>Selecionar Opção</option>
                  <option value="EST-Setúbal">Escola Superior de Tecnologia de Setúbal</option>
                  <option value="ESE">Escola Superior de Educação</option>
                  <option value="ESCE">Escola Superior de Ciências Empresariais</option>
                  <option value="ESS">Escola Superior de Saúde</option>
                  <option value="EST-Barreiro">Escola Superior de Tecnologia do Barreiro</option>
                </select>
                <span className="red-text">{errors.schoolIPS}</span>
              </div>

              <div className="input-field col s12">
                <label htmlFor="name">Curso/Formação em *</label><br></br>
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
                <label htmlFor="name">Áreas Interesse *</label><br></br>
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

            </form>
            <div className="col s12" style={{ marginTop: "1%", paddingBottom: 60 }}>
              <button style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, marginLeft: "20%" }}
                type="submit" onClick={this.onSubmit} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Editar
              </button>
              <a style={{ width: 150, borderRadius: 10, letterSpacing: 1.5, backgroundColor: "red", marginRight: "20%" }}
                href={"/baseProfile/" + this.props.match.params.id} className="right btn btn-large waves-effect waves-light hoverable accent-3">Cancelar
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}