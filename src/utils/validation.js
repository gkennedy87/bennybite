export const REGEX = {
  EMAIL: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
  SPECIAL_CHARECTERS: /^[\w&.\-]+$/,
  ONLY_CHARECTERS: /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/,
  TITLE: /^[ A-Za-z0-9\,'-]*$/,
  DATE: /^\d{2}\/\d{2}\/\d{4}$/,
  UPPERCASE: /[A-Z]/g,
  LOWERCASE: /[a-z]/g,
  NUMBER: '^[0-9]+$',
  MIN_NUMBERS: '(^[0][1-9]+)|([1-9]d*)',
};

// Email Validation
export const validateEmail = (email) => {
  let regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  return email.match(regex);
};

// Name Validation
export const validateCharacter = (name) => {
  var regex = /^[a-zA-Z0-9]+$/;
  return regex.test(name);
};

// Phone Validation
export const validatePhone = (phone) => {
  let regex = /^(\+\d{1,3}[- ]?)?\d{10,13}$/;
  let length = phone.length <= 13;
  return regex.test(phone) && length;
};
export const validateAccountNumber = (account) => {
  var regex = /^[a-zA-Z0-9]+$/;
  return regex.test(account);
};

// Phone Validation
export const validateOtp = (otp) => {
  var regex = /^[0-9]+$/;
  let length = otp.length == 6;
  return regex.test(otp) && length;
};
