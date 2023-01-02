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

  return error;
};
