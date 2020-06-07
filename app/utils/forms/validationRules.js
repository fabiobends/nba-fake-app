const validationRules = (rules, value, form) => {

  let valid = true;
  for (let rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = valid && isNotEmpty(value);
        break;
      case 'isEmail':
        valid = valid && validEmail(value);
        break;
      case 'minLength':
        valid = valid && validMinLength(value, rules[rule]);
        break;
      case 'confirmPass':
        valid = valid && validConfirmPassword(value, form[rules.confirmPass].value);
        break;
      default:
        valid = true;
    }
  }
  return valid;
}

const isNotEmpty = (value) => {

  if (value !== '') {
    return true;
  }
  return false;
}

const validEmail = (value) => {

  let expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(String(value).toLocaleLowerCase());
}

const validMinLength = (value, minLength) => {

  if (value.length >= minLength) {
    return true;
  }
  return false;
}

const validConfirmPassword = (value, password) => {
  return value === password;
}

export default validationRules;
