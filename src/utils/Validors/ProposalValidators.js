import validator from 'validator';
import Toaster from '../../components/Common/Toaster';
const titleValidate = (name) => {
  const currentName = name.replace(' ', '');
  return (
    validator.isAlphanumeric(currentName) && validator.isLength(currentName, { min: 10, max: 200 })
  );
};

const amountValidate = (amount) => {
  return (
    validator.isNumeric(amount) &&
    validator.isLength(amount, { min: 1, max: 16 }) &&
    parseInt(amount) >= 1
  );
};

const descriptionValidate = (desc) => {
  return validator.isLength(desc, { min: 10 });
};

const dateValidate = (startdate, enddate, toaster) => {
  const startDate = new Date(startdate);
  const endDate = new Date(enddate);
  const currentDate = new Date();
  if (startDate - currentDate >= 0 && endDate - currentDate > 0) {
    if (endDate - startDate > 0) {
      return true;
    } else {
      Toaster(toaster, 'error', 'Invalid End Date');
      return false;
    }
  }
  if (startDate - currentDate < 0) Toaster(toaster, 'error', 'Invalid Start Date');
  else if (endDate - currentDate <= 0) Toaster(toaster, 'error', 'Invalid End Date');
  return false;
};

export { titleValidate, amountValidate, descriptionValidate, dateValidate };
