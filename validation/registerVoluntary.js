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
    let arrInterestAreas = new Array();
    arrInterestAreas = data.interestAreas;
    let arrReasons = new Array();
    arrReasons = data.reasons;
    let number = new Int32Array; 
    number = data.phone
    var firstNumber = String(number).charAt(0);
    firstNumber = Number(firstNumber); 
    birthDate1 = data.birthDate.split("-");
    day = birthDate1[0];
    month = birthDate1[1];
    year = birthDate1[2];

    if(day < 1 || day > 31){
        errors.birthDate = "Dia Inválido";
    }

    if(month < 1 || month > 12){
        errors.birthDate = "Mês Inválido";
    }

    if(year < 1930 || year > 2002){
        errors.birthDate = "Ano Inválido";
    }

    //Username checks
    if (Validator.isEmpty(data.username)){
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

    if (number.length < 9 || number.length > 9) {
        errors.phone = "Telemóvel deverá ter 9 dígitos";
    }

    if (firstNumber !== 9) {
        errors.phone = "O Nº de Telemóvel deverá começar por 9";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Password devem ser iguais";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};