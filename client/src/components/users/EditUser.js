import React, { Component } from 'react';
import axios from 'axios';
import M from "materialize-css";
import options from "materialize-css";

export default class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
      memberIPS: "",
      schoolIPS: "",
      courseIPS: "",
      interestAreas: [],
      reasons: [],
      companyAddress: "",
      companyName: "",
      role: "",
      observations: "",
      username: ""
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeInterestAreas = this.handleChangeInterestAreas.bind(this);
    this.handleChangeReasons = this.handleChangeReasons.bind(this);
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/users/getUserDetails/' + this.props.match.params.id),
      axios.get('/api/users/getUser/' + this.props.match.params.id)
    ])
      .then(responseArr => {
        this.setState({
          name: responseArr[0].data.name,
          email: responseArr[0].data.email,
          phone: responseArr[0].data.phone,
          address: responseArr[0].data.address,
          memberIPS: responseArr[0].data.memberIPS,
          schoolIPS: responseArr[0].data.schoolIPS,
          courseIPS: responseArr[0].data.courseIPS,
          interestAreas: responseArr[0].data.interestAreas,
          reasons: responseArr[0].data.reasons,
          companyAddress: responseArr[0].data.companyAddress,
          companyName: responseArr[0].data.companyName,
          observations: responseArr[0].data.observations,
          role: responseArr[1].data.role,
          username: responseArr[1].data.username
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

  handleChangeReasons(event) {
    this.setState({ reasons: Array.from(event.target.selectedOptions, (item) => item.value) });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      member: this.state.member,
      school: this.state.school,
      course: this.state.course,
      companyAddress: this.state.companyAddress,
      companyName: this.state.companyName,
      role: this.state.role,
      observations: this.state.observations,
      username: this.state.username
    };
    axios.post('/api/admin/updateUser/' + this.props.match.params.id, obj)
      .then(res => console.log(res.data));
    this.props.history.push('/listUsers');
    window.location.reload();
  }

  render() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, options);
      console.log(instances);
    });

    return (
      <div>
        {(() => {
          if (this.state.role === "Voluntário") {
            return (
              <div className="container" style={{ marginTop: "5%" }}>
                <div className="row">
                  <div className="col s8 offset-s2">
                    <a href="/listUsers" className="btn-flat waves-effect">
                      <i className="material-icons left">keyboard_backspace</i>
                            Voltar
                        </a>

                    <form noValidate>
                      <div className="input-field col s12">
                        <label htmlFor="name">Username</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.username}
                          id="username"
                          type="text"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="email">Email</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.email}
                          id="email"
                          type="email"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="password">Password</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.password}
                          id="password"
                          type="password"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="password2">Confirmar Password</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.password2}
                          id="password2"
                          type="password"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Nome Completo</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.name}
                          id="name"
                          type="text"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="number">Nº Telemóvel *</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.phone}
                          id="phone"
                          type="number"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Morada (Concelho)</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.address}
                          id="address"
                          type="text"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Data Nascimento</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.birthDate}
                          id="birthDate"
                          type="date"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Membro da Comunidade IPS</label><br></br>
                        <select onChange={this.onChange}
                          value={this.state.memberIPS}
                          id="memberIPS"
                          type="text">
                          <option value="" disabled selected>Selecionar Opção</option>
                          <option value="Estudante">Estudante</option>
                          <option value="Diplomado">Diplomado</option>
                          <option value="Docente">Docente</option>
                          <option value="Não Docente">Não Docente</option>
                          <option value="Bolseiro">Bolseiro</option>
                          <option value="Aposentado">Aposentado</option>
                        </select>
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Escola/Serviço</label><br></br>
                        <select onChange={this.onChange}
                          value={this.state.schoolIPS}
                          id="schoolIPS"
                          type="text">
                          <option value="" disabled selected>Selecionar Opção</option>
                          <option value="EST-Setúbal">Escola Superior de Tecnologia de Setúbal</option>
                          <option value="ESE">Escola Superior de Educação</option>
                          <option value="ESCE">Escola Superior de Ciências Empresariais</option>
                          <option value="ESS">Escola Superior de Saúde</option>
                          <option value="EST-Barreiro">Escola Superior de Tecnologia do Barreiro</option>
                        </select>
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Curso/Formação em</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.courseIPS}
                          id="courseIPS"
                          type="text"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Áreas Interesse</label><br></br>
                        <select multiple={true} value={this.state.interestAreas} onChange={this.handleChangeInterestAreas}>
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
                        <label htmlFor="name">Razões para querer ser voluntário</label><br></br>
                        <select multiple={true} value={this.state.reasons} onChange={this.handleChangeReasons}>
                          <option disabled>Selecionar Opções</option>
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
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Observações</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.observations}
                          id="observations"
                          type="text"
                        />
                      </div>

                    </form>
                    <div className="col s12" style={{ paddingLeft: "11.250px", paddingBottom: "60px" }}>
                      <br></br>
                      <button
                        style={{
                          width: "150px",
                          borderRadius: 10,
                          letterSpacing: "1.5px",
                          marginTop: "1rem"
                        }}
                        type="submit"
                        onClick={this.onSubmit}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                        Editar
                                </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })()}
         {(() => {
          if (this.state.role === "Empresa") {
            return (
              <div className="container" style={{ marginTop: "5%" }}>
                <div className="row">
                  <div className="col s8 offset-s2">
                    <a href="/listUsers" className="btn-flat waves-effect">
                      <i className="material-icons left">keyboard_backspace</i>
                            Voltar
                        </a>

                    <form noValidate>
                      <div className="input-field col s12">
                        <label htmlFor="name">Username</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.username}
                          id="username"
                          type="text"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="email">Email</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.email}
                          id="email"
                          type="email"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="password">Password</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.password}
                          id="password"
                          type="password"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="password2">Confirmar Password</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.password2}
                          id="password2"
                          type="password"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Nome Completo</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.name}
                          id="name"
                          type="text"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="number">Nº Telemóvel</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.phone}
                          id="phone"
                          type="number"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Morada (Concelho)</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.address}
                          id="address"
                          type="text"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Data Nascimento</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.birthDate}
                          id="birthDate"
                          type="date"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Nome Empresa</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.companyName}
                          id="companyName"
                          type="text"
                        />

                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Morada (Concelho) Empresa</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.companyAddress}
                          id="companyAddress"
                          type="text"
                        />
                      </div>

                      <div className="input-field col s12">
                        <label htmlFor="name">Observações</label><br></br>
                        <input
                          onChange={this.onChange}
                          value={this.state.observations}
                          id="observations"
                          type="text"
                        />
                      </div>

                    </form>
                    <div className="col s12" style={{ paddingLeft: "11.250px", paddingBottom: "60px" }}>
                      <br></br>
                      <button
                        style={{
                          width: "150px",
                          borderRadius: 10,
                          letterSpacing: "1.5px",
                          marginTop: "1rem"
                        }}
                        type="submit"
                        onClick={this.onSubmit}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                        Editar</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })()}
      </div>
    )
  }
}
