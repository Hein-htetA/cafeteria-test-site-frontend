export const ValidateCheckout = (formValue) => {
  const error = {};

  ///////////
  if (!formValue.customerName.trim()) {
    error.nameError = "required"; //customer name error
  }

  /////////// Phone Number
  if (
    JSON.stringify(formValue.phoneNumber).length < 8 ||
    JSON.stringify(formValue.phoneNumber).length > 12
  ) {
    error.phoneError = "Invalid"; //phoneNumber error
  }

  if (!formValue.phoneNumber) {
    error.phoneError = "required"; //phoneNumber error
  }

  ////////

  if (JSON.parse(formValue.requestDelivery)) {
    //check only when request delivery
    if (!formValue.address) {
      error.addressError = "required";
    }
  }

  if (formValue.paymentMethod.value !== "Cash") {
    //check only when payment is not cash
    if (
      JSON.stringify(formValue.paymentMethod.additionalInfo.number).length <
        8 ||
      JSON.stringify(formValue.paymentMethod.additionalInfo.number).length > 12
    ) {
      error.paymentNumberError = "Invalid";
    }

    if (!formValue.paymentMethod.additionalInfo.number) {
      error.paymentNumberError = "required";
    }

    if (!formValue.paymentMethod.additionalInfo.name) {
      error.paymentNameError = "required";
    }
  }

  return error;
};
