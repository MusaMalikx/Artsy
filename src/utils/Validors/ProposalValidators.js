import validator from 'validator';

const titleValidate = (name) => {
  const currentName = name.replace(' ', '');
  return validator.isAlphanumeric(currentName) && validator.isLength(currentName, { min: 10, max: 200 });
};

const amountValidate = (amount) => {
  return validator.isNumeric(amount) && validator.isLength(amount, { min: 1, max: 16 }) && parseInt(amount)>=1;
};


const descriptionValidate = (desc) => {
    return validator.isLength(desc, { min: 10 });
  };


export { titleValidate,amountValidate, descriptionValidate };
