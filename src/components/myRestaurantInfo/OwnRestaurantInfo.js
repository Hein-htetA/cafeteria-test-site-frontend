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
import MenuLoading from "../menu/MenuLoadingError/MenuLoading";
import LoadingOrder from "../order/OrderStates/LoadingOrder";

const OwnRestaurantInfo = () => {
  const restaurant = useSelector((state) => state.restaurant.restaurantData);
  const restaurantStatus = useSelector(
    (state) => state.restaurant.restaurantStatus
  );

  const [formValues, setFormValues] = useState(restaurant);

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    firstPhoneError: "",
    photoError: "",
  });

  const dispatch = useDispatch();

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

  if (restaurantStatus === "loading") {
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
      <RestaurantUpdateBtn formValues={formValues} />
    </div>
  );
};

export default OwnRestaurantInfo;
