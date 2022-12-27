import React, { useEffect, useState } from "react";
import { validate } from "../registerRestaurant/validate";
import RestaurantInfoContainer from "../restaurantInfo/RestaurantInfoContainer";
import RestaurantPhoto from "../restaurantInfo/RestaurantPhoto";
import { localBaseUrl } from "../utils/baseUrl";
import { resizeRestaurant } from "../registerRestaurant/RegisterRestaurant";
import { useUiContext } from "../../Context/UserContext";
import RegRestaurantAddPhoto from "../registerRestaurant/RegRestaurantAddPhoto";
import RestaurantDetailGrid from "../restaurantInfo/RestaurantDetailGrid";
import RestaurantName from "../restaurantInfo/RestaurantName";
import RestaurantPhone from "../restaurantInfo/RestaurantPhone";
import RestaurantAddress from "../restaurantInfo/RestaurantAddress";
import RestaurantEstablished from "../restaurantInfo/RestaurantEstablished";
import RegisterDelivery from "../registerRestaurant/RegisterDelivery";
import RegisterPaymentMethod from "../registerRestaurant/RegisterPaymentMethod";
import RestaurantUpdateBtn from "./RestaurantUpdateBtn";
import { useMenuContext } from "../../Context/MenuContext";
import LoadingOrder from "../order/OrderStates/LoadingOrder";

const OwnRestaurantInfo = () => {
  const {
    updateLocalRestaurant,
    restaurant,
    restaurantLoading,
    restaurantSuccess,
  } = useMenuContext();
  const [formValues, setFormValues] = useState(restaurant);
  // const [formValues, setFormValues] = useState({
  //   restaurantPhotoUrl: "",
  //   restaurantPhotoId: "",
  //   restaurantImage: "",
  //   name: "",
  //   firstPhone: "",
  //   secondPhone: "",
  //   address: "",
  //   establishedIn: 2022,
  //   delivery: "Available",
  //   paymentMethods: [
  //     {
  //       checked: false,
  //       value: "Cash",
  //       additionalInfo: { name: "", number: "" },
  //     },
  //     {
  //       checked: false,
  //       value: "KBZPay",
  //       additionalInfo: { name: "", number: "" },
  //     },
  //     {
  //       checked: false,
  //       value: "WavePay",
  //       additionalInfo: { name: "", number: "" },
  //     },
  //   ],
  // });

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    firstPhoneError: "",
    photoError: "",
  });

  const [updateStatus, setUpdateStatus] = useState({
    updateLoading: false,
    updateError: false,
    updateSuccess: false,
  });

  // const { setRestaurant, restaurant } = useUiContext();

  // useEffect(() => {
  //   setFormValues({ ...formValues, ...restaurant });
  // }, []);

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
    setUpdateStatus({
      ...updateStatus,
      updateError: false,
      updateSuccess: false,
    });
  };

  const removePhoto = () => {
    setFormValues({
      ...formValues,
      restaurantPhotoUrl: "",
      restaurantImage: "",
    });
    setUpdateStatus({
      ...updateStatus,
      updateError: false,
      updateSuccess: false,
    });
  };

  const onChangeInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormErrors({
      nameError: "",
      firstPhoneError: "",
    });
    setUpdateStatus({
      ...updateStatus,
      updateError: false,
      updateSuccess: false,
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
    setUpdateStatus({
      ...updateStatus,
      updateError: false,
      updateSuccess: false,
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
    setUpdateStatus({
      ...updateStatus,
      updateError: false,
      updateSuccess: false,
    });
  };

  const handleUpdateRestaurant = async () => {
    const error = validate(formValues);
    setFormErrors({ ...formErrors, ...error });
    if (Object.keys(error).length !== 0) return;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
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
      }),
    };
    try {
      setUpdateStatus({
        ...updateStatus,
        updateLoading: true,
        updateError: false,
      });
      const response = await fetch(
        `${localBaseUrl}/restaurants`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const { updatedRestaurant } = await response.json();
      setUpdateStatus({
        ...updateStatus,
        updateLoading: false,
        updateError: false,
        updateSuccess: true,
      });
      updateLocalRestaurant(updatedRestaurant);
    } catch (error) {
      setUpdateStatus({
        ...updateStatus,
        updateLoading: false,
        updateError: true,
      });
    }
  };
  if (restaurantLoading) {
    //handle navigating to restaurantinfo while restaurant data is still fetching
    return <LoadingOrder />;
  }
  return (
    <div className="register-restaurant-container">
      <RestaurantInfoContainer>
        <RestaurantPhoto
          restaurantPhotoUrl={formValues.restaurantPhotoUrl}
          restaurantImage={formValues.restaurantImage}
        />
        <RegRestaurantAddPhoto
          onChangePhoto={onChangePhoto}
          removePhoto={removePhoto}
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
      <RestaurantUpdateBtn
        handleUpdateRestaurant={handleUpdateRestaurant}
        updateStatus={updateStatus}
      />
    </div>
  );
};

export default OwnRestaurantInfo;
