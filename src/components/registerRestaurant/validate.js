export const validate = (formValue) => {
  const error = {};

  ///////////
  if (!formValue.name) {
    error.nameError = "required";
  }

  /////////// Phone Number
  if (
    JSON.stringify(formValue.firstPhone).length < 8 ||
    JSON.stringify(formValue.firstPhone).length > 12
  ) {
    error.firstPhoneError = "Invalid No.";
  }

  if (!formValue.firstPhone) {
    error.firstPhoneError = "required";
  }

  return error;
};
