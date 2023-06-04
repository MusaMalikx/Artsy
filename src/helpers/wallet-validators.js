import validator from 'validator';

//validate a wallet's holdername
const holderNameValidate = (name) => {
  return (
    validator.isAlphanumeric(validator.blacklist(name, ' ')) &&
    validator.isLength(name, { min: 3, max: 30 })
  );
};
//validate a wallet's card number
const cardNumberValidate = (cardnumber) => {
  return validator.isNumeric(cardnumber) && validator.isLength(cardnumber, { min: 16, max: 16 });
};
//validate a wallet's amount
const amountValidate = (balance) => {
  return validator.isNumeric(balance) && validator.isLength(balance, { min: 1 });
};
//validate a wallet's security code
const secruityCodeValidate = (secCode) => {
  return validator.isNumeric(secCode) && validator.isLength(secCode, { min: 3, max: 3 });
};

export { holderNameValidate, secruityCodeValidate, cardNumberValidate, amountValidate };
