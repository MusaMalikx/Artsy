import validator from 'validator';

const holderNameValidate = (name) => {
  return (
    validator.isAlphanumeric(validator.blacklist(name, ' ')) &&
    validator.isLength(name, { min: 3, max: 30 })
  );
};

const cardNumberValidate = (cardnumber) => {
  return validator.isNumeric(cardnumber) && validator.isLength(cardnumber, { min: 16, max: 16 });
};

const amountValidate = (balance) => {
  return validator.isNumeric(balance) && validator.isLength(balance, { min: 1 });
};

const secruityCodeValidate = (secCode) => {
  return validator.isNumeric(secCode) && validator.isLength(secCode, { min: 3, max: 3 });
};

export { holderNameValidate, secruityCodeValidate, cardNumberValidate, amountValidate };
