export const onBlurValidate = (formValue) => {
  const error = {};

  ///////////
  if (!formValue.name) {
    error.name = true;
  }

  /////////// Phone Number
  if (
    JSON.stringify(formValue.phone).length < 8 ||
    JSON.stringify(formValue.phone).length > 12
  ) {
    error.phoneMsg = "Invalid No.";
    error.phone = true;
  }

  if (!formValue.phone) {
    error.phone = true;
    error.phoneMsg = "";
  }

  /////////// Password

  if (formValue.password.length < 3) {
    error.passwordMsg = "Too Short!";
    error.password = true;
  } else if (formValue.password.length > 10) {
    error.passwordMsg = "Too Long!";
    error.password = true;
  } else {
    error.passwordMsg = "";
    error.password = false;
  }

  if (!formValue.password) {
    error.passwordMsg = "";
    error.password = true;
  }

  return error;
};

export const confirmPasswordValidate = (formValue) => {
  const error = {};

  if (formValue.password !== formValue.confirmPassword) {
    error.confirmPassword = true;
    error.confirmPasswordMsg = "Doesn't match!";
  } else {
    error.confirmPassword = false;
    error.confirmPasswordMsg = "";
  }

  return error;
};
