import React, { useState } from "react";
import { validate } from "../registerRestaurant/validate";
import RestaurantInfoContainer from "../restaurantInfo/RestaurantInfoContainer";
import RestaurantPhoto from "../restaurantInfo/RestaurantPhoto";
import { localBaseUrl } from "../utils/baseUrl";
import { resizeRestaurant } from "../registerRestaurant/RegisterRestaurant";
import RegRestaurantAddPhoto from "../registerRestaurant/RegRestaurantAddPhoto";
import RestaurantDetailGrid from "../restaurantInfo/RestaurantDetailGrid";
import RestaurantName from "../restaurantInfo/RestaurantName";
import RestaurantPhone from "../restaurantInfo/RestaurantPhone";
import RestaurantAddress from "../restaurantInfo/RestaurantAddress";
import RestaurantEstablished from "../restaurantInfo/RestaurantEstablished";
import RegisterDelivery from "../registerRestaurant/RegisterDelivery";
import RegisterPaymentMethod from "../registerRestaurant/RegisterPaymentMethod";
import RestaurantUpdateBtn from "./RestaurantUpdateBtn";
import { useDispatch, useSelector } from "react-redux";
import { resetUpdateRestaurantStatus } from "../../features/restaurantSlice";
import LoadingOrder from "../order/OrderStates/LoadingOrder";
import RestaurantStatus from "../registerRestaurant/RestaurantStatus";

const OwnRestaurantInfo = () => {
  const restaurant = useSelector((state) => state.restaurant.restaurantData);
  if (Object.keys(restaurant).length === 0) {
    return <LoadingOrder />;
  }

  return <OwnRestaurantInfoDisplay restaurant={restaurant} />;
};

const OwnRestaurantInfoDisplay = ({ restaurant }) => {
  const [formValues, setFormValues] = useState(restaurant);

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    firstPhoneError: "",
    photoError: "",
  });

  const dispatch = useDispatch();

  const updateRestaurantStatus = useSelector(
    (state) => state.restaurant.updateRestaurantStatus
  );

  const onChangePhoto = async (e) => {
    const inputImage = e.target.files[0];
    if (inputImage.size > 6144000) {
      setFormErrors({ ...formErrors, photoError: true });
      return;
    }
    try {
      const image = await resizeRestaurant(inputImage);
      setFormValues({ ...formValues, restaurantImage: image });
      setFormErrors({ ...formErrors, photoError: false });
    } catch (error) {
      console.log(error);
    }
    dispatch(resetUpdateRestaurantStatus());
  };

  const removePhoto = () => {
    setFormValues({
      ...formValues,
      restaurantPhotoUrl: "",
      restaurantImage: "",
    });
    dispatch(resetUpdateRestaurantStatus());
  };

  const onChangeInput = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setFormErrors({
      nameError: "",
      firstPhoneError: "",
    });
    dispatch(resetUpdateRestaurantStatus());
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
    dispatch(resetUpdateRestaurantStatus());
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
    dispatch(resetUpdateRestaurantStatus());
  };

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
          disabled={updateRestaurantStatus === "loading"}
        />
        {formErrors.photoError && (
          <div className="image-error-message">
            <div className="image-error-message-first">
              Image Size {">"} 6MB
            </div>
            <div className="image-error-message-second">
              Upload Unsuccessful!
            </div>
          </div>
        )}
        <RestaurantStatus
          status={formValues.status}
          onChangeInput={onChangeInput}
          disabled={updateRestaurantStatus === "loading"}
        />
        <RestaurantDetailGrid>
          <RestaurantName
            name={formValues.name}
            onChangeInput={onChangeInput}
            nameError={formErrors.nameError}
            isOwner={true}
            disabled={updateRestaurantStatus === "loading"}
          />
          <RestaurantPhone
            firstPhone={formValues.firstPhone}
            secondPhone={formValues.secondPhone}
            onChangeInput={onChangeInput}
            firstPhoneError={formErrors.firstPhoneError}
            isOwner={true}
            disabled={updateRestaurantStatus === "loading"}
          />
          <RestaurantAddress
            address={formValues.address}
            onChangeInput={onChangeInput}
            isOwner={true}
            disabled={updateRestaurantStatus === "loading"}
          />
          <RestaurantEstablished
            establishedIn={formValues.establishedIn}
            onChangeInput={onChangeInput}
            isOwner={true}
            disabled={updateRestaurantStatus === "loading"}
          />
          <RegisterDelivery
            deliveryService={formValues.deliveryService}
            onChangeDeliverySelect={onChangeDeliverySelect}
            isOwner={true}
            disabled={updateRestaurantStatus === "loading"}
          />
          <RegisterPaymentMethod
            paymentMethods={formValues.paymentMethods}
            onChangeCheckbox={onChangeCheckbox}
            isOwner={true}
            disabled={updateRestaurantStatus === "loading"}
          />
        </RestaurantDetailGrid>
      </RestaurantInfoContainer>
      <RestaurantUpdateBtn formValues={formValues} />
    </div>
  );
};

export default OwnRestaurantInfo;
