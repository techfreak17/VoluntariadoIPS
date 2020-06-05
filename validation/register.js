const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInputCompany(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.birthDate = !isEmpty(data.birthDate) ? data.birthDate : "";
    data.companyAddress = !isEmpty(data.companyAddress) ? data.companyAddress : "";
    data.companyName = !isEmpty(data.companyName) ? data.companyName : "";

    //Username checks
    if (Validator.isEmpty(data.username)) {
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

    // birthDate checks
    if (Validator.isEmpty(data.companyAddress)) {
        errors.companyAddress = "Deverá preencher o campo Morada (Concelho) Empresa";
    }

    // birthDate checks
    if (Validator.isEmpty(data.companyName)) {
        errors.companyName = "Deverá preencher o campo Nome Empresa";
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
