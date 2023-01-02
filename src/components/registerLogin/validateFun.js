export const validate = (formValue) => {
  const error = {};

  ///////////
  if (!formValue.name.trim()) {
    error.nameError = "required";
  }

  /////////// Phone Number
  if (
    JSON.stringify(formValue.phone).length < 8 ||
    JSON.stringify(formValue.phone).length > 12
  ) {
    error.phoneError = "Invalid No.";
  }

  if (!formValue.phone) {
    error.phoneError = "required";
  }

  /////////// Password

  if (formValue.password.length < 3) {
    error.passwordError = "Too Short!";
  } else if (formValue.password.length > 10) {
    error.passwordError = "Too Long!";
  }

  if (!formValue.password) {
    error.passwordError = "required";
  }

  if (!formValue.confirmPassword) {
    error.confirmPasswordError = "required";
  }

  if (!error.passwordError) {
    if (formValue.password !== formValue.confirmPassword) {
      error.confirmPasswordError = "Doesn't match!";
      error.passwordError = "Doesn't match!";
    }
  }

  return error;
};
