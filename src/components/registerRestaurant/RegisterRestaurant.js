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
import { localBaseUrl } from "../utils/baseUrl";
import { useUserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import RegRestaurantAddPhoto from "./RegRestaurantAddPhoto";
import { useMenuContext } from "../../Context/MenuContext";

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

  const [registerStatus, setRegisterStatus] = useState({
    registerLoading: false,
    registerError: false,
    registerSuccess: false,
  });

  const { user, setUser } = useUserContext();
  const { updateLocalRestaurant } = useMenuContext();

  const navigate = useNavigate();

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
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formValues,
        firstPhone:
          formValues.firstPhone[0] === "0"
            ? formValues.firstPhone.slice(1)
            : formValues.firstPhone.slice(0),
        secondPhone:
          formValues.secondPhone[0] === "0"
            ? formValues.secondPhone.slice(1)
            : formValues.secondPhone.slice(0),
        ownerId: user._id,
      }),
    };
    try {
      setRegisterStatus({
        ...registerStatus,
        registerLoading: true,
        registerError: false,
      });
      const response = await fetch(
        `${localBaseUrl}/restaurants`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const { restaurant, user } = await response.json();
      setRegisterStatus({
        ...registerStatus,
        registerLoading: false,
        registerError: false,
        registerSuccess: true,
      });
      updateLocalRestaurant(restaurant);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(`/myAccount/myRestaurant/menu`, {
        replace: true,
      });
    } catch (error) {
      setRegisterStatus({
        ...registerStatus,
        registerLoading: false,
        registerError: true,
      });
    }
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
        />
        <RestaurantDetailGrid>
          <RestaurantName
            name={formValues.name}
            onChangeInput={onChangeInput}
            nameError={formErrors.nameError}
            isOwner={true}
          />
          <RestaurantPhone
            firstPhone={formValues.firstPhone}
            secondPhone={formValues.secondPhone}
            onChangeInput={onChangeInput}
            firstPhoneError={formErrors.firstPhoneError}
            isOwner={true}
          />
          <RestaurantAddress
            address={formValues.address}
            onChangeInput={onChangeInput}
            isOwner={true}
          />
          <RestaurantEstablished
            establishedIn={formValues.establishedIn}
            onChangeInput={onChangeInput}
            isOwner={true}
          />
          <RegisterDelivery
            deliveryService={formValues.deliveryService}
            onChangeDeliverySelect={onChangeDeliverySelect}
            isOwner={true}
          />
          <RegisterPaymentMethod
            paymentMethods={formValues.paymentMethods}
            onChangeCheckbox={onChangeCheckbox}
            isOwner={true}
          />
        </RestaurantDetailGrid>
      </RestaurantInfoContainer>
      <RegisterRestaurantBtn
        handleRegisterRestaurant={handleRegisterRestaurant}
        registerStatus={registerStatus}
      />
    </div>
  );
};

export default RegisterRestaurant;
