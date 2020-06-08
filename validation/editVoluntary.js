const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEditInputVoluntary(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.role = !isEmpty(data.role) ? data.role : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.birthDate = !isEmpty(data.birthDate) ? data.birthDate : "";
    data.memberIPS = !isEmpty(data.memberIPS) ? data.memberIPS : "";
    data.schoolIPS = !isEmpty(data.schoolIPS) ? data.schoolIPS : "";
    let arrInterestAreas = new Array();
    arrInterestAreas = data.interestAreas;
    let arrReasons = new Array();
    arrReasons = data.reasons;
    let number = new Int32Array;
    number = data.phone

    //Username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Deverá preencher o campo Username";
    }

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Deverá preencher o campo Nome";
    }

    // phone checks
    if (number.length === 0) {
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
    if (arrInterestAreas.length === 0) {
        errors.interestAreas = "Deverá preencher o campo Áreas Interesse";
    }

    // reasons checks
    if (arrReasons.length === 0) {
        errors.reasons = "Deverá preencher o campo Razões Para Querer Ser Voluntário";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Deverá preencher o campo Email";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email Inválido";
    }

    // Password checks

    if (number.length < 9 || number.length > 9) {
        errors.phone = "Telemóvel deverá ter 9 dígitos";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};