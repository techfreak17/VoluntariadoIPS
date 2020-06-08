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
        errors.username = "Username field is required";
    }

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.role)) {
        errors.role = "Role field is required";
    }

    // phone checks
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    }

    // address checks
    if (Validator.isEmpty(data.address)) {
        errors.address = "Address field is required";
    }

    // birthDate checks
    if (Validator.isEmpty(data.birthDate)) {
        errors.birthDate = "birthDate field is required";
    }

    // memberIPS checks
    if (Validator.isEmpty(data.memberIPS)) {
        errors.memberIPS = "memberIPS field is required";
    }

    // schoolIPS checks
    if (Validator.isEmpty(data.schoolIPS)) {
        errors.schoolIPS = "SchoolIPS field is required";
    }

    // interestAreas checks
    if (Validator.isEmpty(data.interestAreas)) {
        errors.interestAreas = "InterestAreas field is required";
    }

    // reasons checks
    if (Validator.isEmpty(data.reasons)) {
        errors.reasons = "Reasons field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.isLength(data.password2, { min: 6, max: 30 })) {
        errors.password2 = "Password must be at least 6 characters";
    }

    if (!Validator.isLength(data.phone, { min: 9, max: 9 })) {
        errors.phone = "Phone must be 9 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = function validateRegisterInputCompany(data) {
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
    data.companyAddress = !isEmpty(data.companyAddress) ? data.companyAddress : "";
    data.companyName = !isEmpty(data.companyName) ? data.companyName : "";

    //Username checks
    if (Validator.isEmpty(data.username)){
        errors.username = "Username field is required";
    }

    // Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.role)) {
        errors.role = "Role field is required";
    }

    // phone checks
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    }

    // address checks
    if (Validator.isEmpty(data.address)) {
        errors.address = "Address field is required";
    }

    // birthDate checks
    if (Validator.isEmpty(data.birthDate)) {
        errors.birthDate = "birthDate field is required";
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.isLength(data.password2, { min: 6, max: 30 })) {
        errors.password2 = "Password must be at least 6 characters";
    }

    if (!Validator.isLength(data.phone, { min: 9, max: 9 })) {
        errors.phone = "Phone must be 9 characters";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
