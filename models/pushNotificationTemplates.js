const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PushNotificationTemplatesSchema = new Schema({
    semVagas: {
        type: String,
        default: 'O seu projecto {{ title }} encontra-se com o numero de vagas designado.'
    },
    confirmarEmail: {
        type: String,
        default: 'Acabou de criar uma conta no portal de voluntariado IPS.'
    },
    projectoEditado: {
        type: String,
        default: 'Um projecto do qual que você faz parte sofreu alterações!{{ title }}'
    },
    novoProjecto: {
        type: String,
        default: 'O seu projecto {{ title }} foi criado com sucesso!'
    },
    projectoRemovido:{
        type: String,
        default: 'Um projecto do qual você fazia parte foi removido! {{ title }}'
    }
    
});
module.exports = PushNotificationTemplates = mongoose.model("PushNotificationTemplates", PushNotificationTemplatesSchema);