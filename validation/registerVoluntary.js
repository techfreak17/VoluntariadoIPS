const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInputVoluntary(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.role = !isEmpty(data.role) ? data.role : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.birthDate = !isEmpty(data.birthDate) ? data.birthDate : "";
    data.memberIPS = !isEmpty(data.memberIPS) ? data.memberIPS : "";
    data.schoolIPS = !isEmpty(data.schoolIPS) ? data.schoolIPS : "";
    data.interestAreas = !isEmpty(data.interestAreas) ? data.interestAreas : "";
    data.reasons =  !isEmpty(data.reasons) ? data.reasons : "";

    //Username checks
    if (Validator.isEmpty(data.username)){
        errors.username = "Deverá preencher o campo Username";
    }

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Deverá preencher o campo Nome";
    }

    // phone checks
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Deverá preencher o campo Telemóvel";
    }

    // birthDate checks
    if (Validator.isEmpty(data.birthDate)) {
        errors.birthDate = "Deverá preencher o campo Data Nascimento";
    }

    // memberIPS checks
    if (Validator.isEmpty(data.memberIPS)) {
        errors.memberIPS = "Deverá preencher o campo Membro Comunidade IPS";
    }

    // schoolIPS checks
    if (Validator.isEmpty(data.schoolIPS)) {
        errors.schoolIPS = "Deverá preencher o campo Escola/Serviço";
    }

    // interestAreas checks
    if (Validator.isEmpty(data.interestAreas)) {
        errors.interestAreas = "Deverá preencher o campo Áreas Interesse";
    }

    // reasons checks
    if (Validator.isEmpty(data.reasons)) {
        errors.reasons = "Deverá preencher o campo Razões Para Querer Ser Voluntário";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Deverá preencher o campo Email";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email Inválido";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Deverá preencher o campo Password";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Deverá preencher o campo Confirmar Password";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password deverá ter no mínimo 6 caracteres";
    }

    if (!Validator.isLength(data.password2, { min: 6, max: 30 })) {
        errors.password2 = "Password deverá ter no mínimo 6 caracteres";
    }

    if (!Validator.isLength(data.phone, { min: 9, max: 9 })) {
        errors.phone = "Telemóvel deverá ter 9 dígitos";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Password devem ser iguais";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};