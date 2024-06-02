// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) =>
  new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
  if (count === 0) return { label: '', color: '' };
  if (count < 2) return { label: 'Poor Password', color: 'error.main' };
  if (count < 3) return { label: 'Weak Password', color: 'warning.main' };
  if (count < 4) return { label: 'Normal Password', color: 'warning.dark' };
  if (count < 5) return { label: 'Good Password', color: 'success.main' };
  if (count < 6) return { label: 'Strong Password', color: 'success.dark' };
  return { label: '', color: '' };
};

// password strength indicator
export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};

// export const validatePassword = (Password) => {
//   let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

//   if (Password.length < 8) {
//     return 'Your password must be at least 8 characters';
//   }
//   if (Password.search(/[a-z]/i) < 0) {
//     return 'Your password must contain at least one letter.';
//   }
//   if (Password.search(/[0-9]/) < 0) {
//     return 'Your password must contain at least one digit.';
//   }

//   if (Password.search(/[A-Z]/) < 0) {
//     return 'Your password needs an uppser case letter';
//   }

//   if (format.test(Password) == false) {
//     return 'Your password needs a special character e.g #';
//   }

//   return true;
// };
