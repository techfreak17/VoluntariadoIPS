import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createVoluntary } from "../../actions/createActions";
import classnames from "classnames";
import M from "materialize-css";
import options from "materialize-css";

class CreateVoluntaryUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: "",
            username: "",
            name: "",
            role: "Voluntário",
            phone: "",
            address: "",
            birthDate: "",
            memberIPS: "",
            schoolIPS: "",
            courseIPS: "",
            interestAreas: [],
            reasons: [],
            observations: "",
            errors: {}
        };

        this.handleChangeInterestAreas = this.handleChangeInterestAreas.bind(this);
        this.handleChangeReasons = this.handleChangeReasons.bind(this);
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
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
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            name: this.state.name,
            role: this.state.role,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            phone: this.state.phone,
            address: this.state.address,
            birthDate: this.state.birthDate,
            memberIPS: this.state.memberIPS,
            schoolIPS: this.state.schoolIPS,
            courseIPS: this.state.courseIPS,
            interestAreas: this.state.interestAreas,
            reasons: this.state.reasons,
            observations: this.state.observations,
        };

        this.props.createVoluntary(newUser, this.props.history);
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
                        <a href="/listUsers" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i>
                            Voltar
                        </a>

                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Criar Voluntário</b>
                            </h4>
                        </div>

                        <form noValidate>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.username
                                    })}
                                />
                                <label htmlFor="name">Username *</label>
                                <span className="red-text">{errors.username}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <label htmlFor="email">Email *</label>
                                <span className="red-text">{errors.email}</span>
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
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <label htmlFor="name">Nome Completo *</label>
                                <span className="red-text">{errors.name}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.phone}
                                    error={errors.phone}
                                    id="phone"
                                    type="number"
                                    className={classnames("", {
                                        invalid: errors.phone
                                    })}
                                />
                                <label htmlFor="number">Nº Telemóvel *</label>
                                <span className="red-text">{errors.phone}</span>
                            </div>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.address}
                                    error={errors.address}
                                    id="address"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.address
                                    })}
                                />
                                <label htmlFor="name">Morada (Concelho)</label>
                                <span className="red-text">{errors.address}</span>
                            </div>

                            <div className="input-field col s12">
                            <label htmlFor="name">Data Nascimento *</label><br></br>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.birthDate}
                                    error={errors.birthDate}
                                    id="birthDate"
                                    type="date"
                                    className={classnames("", {
                                        invalid: errors.birthDate
                                    })}
                                />
                                <span className="red-text">{errors.birthDate}</span>
                            </div>

                            <div className="input-field col s12">
                                <label>Membro da Comunidade IPS *</label><br></br>
                                <select onChange={this.onChange}
                                    value={this.state.memberIPS}
                                    error={errors.memberIPS}
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
                                <span className="red-text">{errors.memberIPS}</span>
                            </div>

                            <div className="input-field col s12">
                                <label>Escola/Serviço *</label><br></br>
                                <select onChange={this.onChange}
                                    value={this.state.schoolIPS}
                                    error={errors.schoolIPS}
                                    id="schoolIPS"
                                    type="text">
                                    <option value="EST-Setúbal" defaultValue>Escola Superior de Tecnologia de Setúbal</option>
                                    <option value="ESE">Escola Superior de Educação</option>
                                    <option value="ESCE">Escola Superior de Ciências Empresariais</option>
                                    <option value="ESS">Escola Superior de Saúde</option>
                                    <option value="EST-Barreiro">Escola Superior de Tecnologia do Barreiro</option>
                                </select>
                                <span className="red-text">{errors.schoolIPS}</span>
                            </div>

                            <div className="input-field col s12">
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
                                <label htmlFor="name">Curso/Formação em</label>
                                <span className="red-text">{errors.courseIPS}</span>
                            </div>

                            <div className="input-field col s12">
                                <label>Áreas Interesse *</label><br></br>
                                <select multiple={true} value={this.state.interestAreas} onChange={this.handleChangeInterestAreas}
                                    error={errors.interestAreas}>
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
                                <label>Razões para querer ser voluntário *</label><br></br>
                                <select multiple={true} value={this.state.reasons} onChange={this.handleChangeReasons}
                                    error={errors.reasons}>
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
                                Registar
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateVoluntaryUser.propTypes = {
    createVoluntary: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { createVoluntary }
)(CreateVoluntaryUser);