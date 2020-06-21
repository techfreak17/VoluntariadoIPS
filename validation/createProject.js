const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateProject(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.synopsis = !isEmpty(data.synopsis) ? data.synopsis : "";
    data.intervationArea = !isEmpty(data.intervationArea) ? data.intervationArea : "";
    data.target_audience = !isEmpty(data.target_audience) ? data.target_audience : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.date = !isEmpty(data.date) ? data.date : "";
    let arrInterestAreas = new Array();
    arrInterestAreas = data.interestAreas;
    date = data.date.split("-");
    year = date[0];

    let numberYear = new Int32Array; 
    numberYear = year

    let currentDate = new Date();
    year1 = currentDate.getFullYear();
    
    if(year<year1){
        errors.date = "Ano Inválido";
    }

    if(numberYear.length > 4){
        errors.date = "Ano Inválido";
    }

    //title checks
    if (Validator.isEmpty(data.title)) {
        errors.title = "Deverá preencher o campo Designação do Projeto/Atividade";
    }

    // synopsis checks
    if (Validator.isEmpty(data.synopsis)) {
        errors.synopsis = "Deverá preencher o campo Resumo Projeto/Atividade";
    }

    // intervationArea checks
    if (Validator.isEmpty(data.intervationArea)) {
        errors.intervationArea = "Deverá preencher o campo Área de Intervenção";
    }

    // target_audience checks
    if (Validator.isEmpty(data.target_audience)) {
        errors.target_audience = "Deverá preencher o campo Público Alvo (Beneficiários)";
    }

    // description checks
    if (Validator.isEmpty(data.description)) {
        errors.description = "Deverá preencher o campo Descrição";
    }

    // date checks
    if (Validator.isEmpty(data.date)) {
        errors.date = "Deverá preencher o campo Data/Horário Previsto";
    }

    // interestAreas checks
    if (arrInterestAreas.length === 0) {
        errors.interestAreas = "Deverá preencher o campo Áreas Interesse";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
