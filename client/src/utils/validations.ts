import { ISignupFormData } from "./interfaces";

const validateSignupForm = (values: ISignupFormData) => {
  const errors: ISignupFormData = {};

  // Validate firstName
  if (!values.firstName) {
    errors.firstName = "Username is required";
  }

  // Validate email
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Email is invalid";
  }

  // Validate password
  if (!values.password) {
    errors.password = "Password is required";
  } else if (!isValidPassword(values.password)) {
    errors.password = `Password must contain minimum 8 symbols string, should contain at least one
     upper case, at least one lower case, at least one digit and at least one special symbol`;
  }

  return errors;
};

const isValidEmail = (email: string) => {
  const emailPattern = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  return emailPattern.test(email);
};

const isValidPassword = (password: string) => {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return passwordPattern.test(password);
};

export default validateSignupForm;
