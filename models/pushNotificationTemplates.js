const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PushNotificationTemplatesSchema = new Schema({
    semVagas: {
        type: String,
        default: 'O seu projeto {{ title }} encontra-se com o número de vagas designado.'
    },
    confirmarEmail: {
        type: String,
        default: 'Acabou de criar uma conta no portal de Voluntariado IPS.'
    },
    projetoEditado: {
        type: String,
        default: 'O projeto {{ title }} do qual faz parte sofreu alterações.'
    },
    novoProjeto: {
        type: String,
        default: 'O seu projeto {{ title }} foi criado com sucesso.'
    },
    projetoRemovido:{
        type: String,
        default: 'O projeto {{ title }} foi removido com sucesso.'
    },
    novoVoluntario:{
        type: String,
        default: 'O voluntário {{ title }} foi criado com sucesso.'
    },
    editarVoluntario:{
        type: String,
        default: 'Os dados do voluntário {{ title }} foram alterados com sucesso.'
    },
    apagarVoluntario:{
        type: String,
        default: 'O voluntário {{ title }} foi eliminado com sucesso.'
    },
    novaEntidade:{
        type: String,
        default: 'A entidade {{ title }} foi criada com sucesso.'
    },
    editarEntidade:{
        type: String,
        default: 'Os dados da entidade {{ title }} foram alterados com sucesso.'
    },
    apagarEntidade:{
        type: String,
        default: 'A entidade {{ title }} foi eliminada com sucesso.'
    },
    entrarProjeto:{
        type: String,
        default: 'Entrou no projeto {{ title }}.'
    },
    sairProjeto:{
        type: String,
        default: 'Saiu do projeto {{ title }}.'
    },
    editarPerfil:{
        type: String,
        default: 'Editou o seu perfil.'
    },
    proporProjetoAdmin:{
        type: String,
        default: 'Nova Proposta de Projeto: {{ title }}'
    },
    proporProjetoEntidade:{
        type: String,
        default: 'Proposta de Projeto: {{ title }} enviada com sucesso.'
    },
    aceitarProjetoAdmin:{
        type: String,
        default: 'Proposta de Projeto: {{ title }} aceite com sucesso.'
    },
    recusarProjetoAdmin:{
        type: String,
        default: 'Proposta de Projeto: {{ title }} recusada com sucesso.'
    },
    aceitarProjetoEntidade:{
        type: String,
        default: 'A sua proposta {{ title }} foi aceite.'
    },
    recusarProjetoEntidade:{
        type: String,
        default: 'A sua proposta {{ title }} foi removida/recusada.'
    }
});
module.exports = PushNotificationTemplates = mongoose.model("PushNotificationTemplates", PushNotificationTemplatesSchema);