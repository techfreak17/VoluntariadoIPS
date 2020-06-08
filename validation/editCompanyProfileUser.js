const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEditInputCompanyProfileUser(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.birthDate = !isEmpty(data.birthDate) ? data.birthDate : "";
    data.companyAddress = !isEmpty(data.companyAddress) ? data.companyAddress : "";
    data.companyName = !isEmpty(data.companyName) ? data.companyName : "";
    let number = new Int32Array; 
    number = data.phone

    //Username checks

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

    // birthDate checks
    if (Validator.isEmpty(data.companyAddress)) {
        errors.companyAddress = "Deverá preencher o campo Morada (Concelho) Empresa";
    }

    // birthDate checks
    if (Validator.isEmpty(data.companyName)) {
        errors.companyName = "Deverá preencher o campo Nome Empresa";
    }

    if (number.length < 9 || number.length > 9) {
        errors.phone = "Telemóvel deverá ter 9 dígitos";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
