import validator from 'validator';
//verify email
const emailValidate = (email) => {
  return validator.isEmail(email);
};

const passValidate = (password) => {
  return validator.isLength(password, { min: 6, max: 30 });
};

const nameValidate = (name) => {
  return (
    validator.isAlphanumeric(validator.blacklist(name, ' ')) &&
    validator.isLength(name, { min: 3, max: 30 })
  );
};

const phoneValidate = (phone) => {
  return (
    validator.isNumeric(phone) &&
    validator.isLength(phone, { min: 11, max: 11 }) &&
    (phone.startsWith('03') || phone.startsWith('04'))
  );
};

const textValidate = (text) => {
  return !validator.equals(text, 'Unknown') && validator.isLength(text, { min: 3, max: 100 });
};

const cnicValidate = (cnic) => {
  return validator.isNumeric(cnic) && validator.isLength(cnic, { min: 13, max: 13 });
};

export { emailValidate, passValidate, nameValidate, phoneValidate, cnicValidate, textValidate };
