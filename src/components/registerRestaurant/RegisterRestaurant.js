import React, { useState } from "react";
import RestaurantInfoContainer from "../restaurantInfo/RestaurantInfoContainer";
import RestaurantPhoto from "../restaurantInfo/RestaurantPhoto";
import "./RegisterRestaurant.css";
import RestaurantDetailGrid from "../restaurantInfo/RestaurantDetailGrid";
import RestaurantName from "../restaurantInfo/RestaurantName";
import RestaurantPhone from "../restaurantInfo/RestaurantPhone";
import RestaurantAddress from "../restaurantInfo/RestaurantAddress";
import RestaurantEstablished from "../restaurantInfo/RestaurantEstablished";
import Resizer from "react-image-file-resizer";
import RegisterRestaurantTitle from "./RegisterRestaurantTitle";
import RegisterPaymentMethod from "./RegisterPaymentMethod";
import RegisterDelivery from "./RegisterDelivery";
import RegisterRestaurantBtn from "./RegisterRestaurantBtn";
import { validate } from "./validate";
import { useNavigate } from "react-router-dom";
import RegRestaurantAddPhoto from "./RegRestaurantAddPhoto";
import { useDispatch, useSelector } from "react-redux";
import { registerRestaurant } from "../../features/restaurantSlice";

export const resizeRestaurant = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const RegisterRestaurant = () => {
  const [formValues, setFormValues] = useState({
    restaurantPhotoUrl: "",
    restaurantPhotoId: "",
    restaurantImage: "",
    name: "",
    firstPhone: "",
    secondPhone: "",
    address: "",
    establishedIn: 2022,
    deliveryService: false,
    paymentMethods: [
      {
        checked: true,
        value: "Cash",
        additionalInfo: { name: "", number: "" },
      },
      {
        checked: false,
        value: "KBZPay",
        additionalInfo: { name: "", number: "" },
      },
      {
        checked: false,
        value: "WavePay",
        additionalInfo: { name: "", number: "" },
      },
    ],
  });

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    firstPhoneError: "",
    photoError: "",
  });

  const registerRestaurantStatus = useSelector(
    (state) => state.restaurant.registerRestaurantStatus
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangePhoto = async (e) => {
    const inputImage = e.target.files[0];
    if (inputImage.size > 6144000) {
      setFormErrors({ ...formErrors, photoError: true });
      return;
    }
    try {
      const image = await resizeRestaurant(e.target.files[0]);
      setFormValues({ ...formValues, restaurantImage: image });
      setFormErrors({ ...formErrors, photoError: false });
    } catch (error) {
      console.log(error);
    }
  };

  const removePhoto = () => {
    setFormValues({
      ...formValues,
      restaurantPhotoUrl: "",
      restaurantImage: "",
    });
  };

  const onChangeInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormErrors({
      nameError: "",
      firstPhoneError: "",
    });
  };

  const onChangeDeliverySelect = (e) => {
    setFormValues({
      ...formValues,
      deliveryService: JSON.parse(e.target.value),
    });
    setFormErrors({
      nameError: "",
      firstPhoneError: "",
    });
  };

  const onChangeCheckbox = (event, index, type) => {
    const tempPaymentMethods = JSON.parse(
      JSON.stringify(formValues.paymentMethods)
    );
    if (type === "checkbox") {
      tempPaymentMethods[index].checked = !tempPaymentMethods[index].checked;
    } else {
      tempPaymentMethods[index].additionalInfo[event.target.name] =
        event.target.value;
    }

    setFormValues({ ...formValues, paymentMethods: [...tempPaymentMethods] });
  };

  const handleRegisterRestaurant = async () => {
    const error = validate(formValues);
    setFormErrors({ ...formErrors, ...error });
    if (Object.keys(error).length !== 0) return;
    await dispatch(registerRestaurant(formValues)).unwrap();
    navigate(`/myAccount/myRestaurant/menu`, {
      replace: true,
    });
  };

  return (
    <div className="register-restaurant-container">
      <RegisterRestaurantTitle />
      <RestaurantInfoContainer>
        <RestaurantPhoto
          restaurantPhotoUrl={formValues.restaurantPhotoUrl}
          restaurantImage={formValues.restaurantImage}
        />
        <RegRestaurantAddPhoto
          onChangePhoto={onChangePhoto}
          removePhoto={removePhoto}
          photoError={formErrors.photoError}
          disabled={registerRestaurantStatus === "loading"}
        />
        <RestaurantDetailGrid>
          <RestaurantName
            name={formValues.name}
            onChangeInput={onChangeInput}
            nameError={formErrors.nameError}
            isOwner={true}
            disabled={registerRestaurantStatus === "loading"}
          />
          <RestaurantPhone
            firstPhone={formValues.firstPhone}
            secondPhone={formValues.secondPhone}
            onChangeInput={onChangeInput}
            firstPhoneError={formErrors.firstPhoneError}
            isOwner={true}
            disabled={registerRestaurantStatus === "loading"}
          />
          <RestaurantAddress
            address={formValues.address}
            onChangeInput={onChangeInput}
            isOwner={true}
            disabled={registerRestaurantStatus === "loading"}
          />
          <RestaurantEstablished
            establishedIn={formValues.establishedIn}
            onChangeInput={onChangeInput}
            isOwner={true}
            disabled={registerRestaurantStatus === "loading"}
          />
          <RegisterDelivery
            deliveryService={formValues.deliveryService}
            onChangeDeliverySelect={onChangeDeliverySelect}
            isOwner={true}
            disabled={registerRestaurantStatus === "loading"}
          />
          <RegisterPaymentMethod
            paymentMethods={formValues.paymentMethods}
            onChangeCheckbox={onChangeCheckbox}
            isOwner={true}
            disabled={registerRestaurantStatus === "loading"}
          />
        </RestaurantDetailGrid>
      </RestaurantInfoContainer>
      <RegisterRestaurantBtn
        handleRegisterRestaurant={handleRegisterRestaurant}
      />
    </div>
  );
};

export default RegisterRestaurant;
