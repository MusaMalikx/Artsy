import validator from 'validator';
import Toaster from '../components/Common/Toaster';

//Validate title of proposal
const titleValidate = (name) => {
  return (
    validator.isAlphanumeric(validator.blacklist(name, ' ')) &&
    validator.isLength(name, { min: 4, max: 200 })
  );
};

//Validate amount of proposal
const amountValidate = (amount) => {
  return (
    validator.isNumeric(amount) &&
    validator.isLength(amount, { min: 1, max: 16 }) &&
    parseInt(amount) >= 1
  );
};

//Validate category
const categoryValidate = (lenght) => {
  if (lenght > 0) {
    return true;
  } else {
    return false;
  }
};

//Validate description of proposal
const descriptionValidate = (desc) => {
  return validator.isLength(desc, { min: 10 });
};

//Validate date to allow listing of auction
const dateValidate = (startdate, enddate, toaster) => {
  const startDate = new Date(startdate);
  const endDate = new Date(enddate);
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() - 5);
  //difference in seconds for end and start
  const diffInSecondsStart = Math.abs(endDate - startDate) / 1000;
  //difference of end and start in days
  let daysStart = Math.floor(diffInSecondsStart / 60 / 60 / 24);
  //difference in seconds for end and current
  const diffInSecondsCur = Math.abs(endDate - currentDate) / 1000;
  //difference of end and current  in days
  let daysCur = Math.floor(diffInSecondsCur / 60 / 60 / 24);

  if (startDate - currentDate >= 0 && endDate - currentDate > 0 && daysCur !== 0) {
    if (endDate - startDate > 0 && daysStart !== 0) {
      return true;
    } else {
      Toaster(toaster, 'error', 'Invalid End Date');
      return false;
    }
  }
  if (startDate - currentDate < 0) Toaster(toaster, 'error', 'Invalid Start Date');
  else if (endDate - currentDate <= 0 || daysCur === 0)
    Toaster(toaster, 'error', 'Invalid End Date');
  return false;
};

export { titleValidate, amountValidate, descriptionValidate, dateValidate, categoryValidate };
