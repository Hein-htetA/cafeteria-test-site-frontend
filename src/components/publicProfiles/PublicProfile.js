import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ProfileBtnGroup from "../profile/ProfileBtnGroup";
import ProfileTitle from "../profile/ProfileTitle";
import Address from "../registerLogin/Address";
import Email from "../registerLogin/Email";
import ExtraPhone from "../registerLogin/ExtraPhone";
import Name from "../registerLogin/Name";
import Phone from "../registerLogin/Phone";
import ProfilePhoto from "../registerLogin/ProfilePhoto";
import RegisterContainer from "../registerLogin/RegisterContainer";
import RegisterInfoContainer from "../registerLogin/RegisterInfoContainer";
import LoadingOrder from "../order/OrderStates/LoadingOrder";

const PublicProfile = () => {
  const profileStatus = useSelector((state) => state.publicData.profileStatus);
  const { restaurantId } = useParams();
  const publicRestaurantOwnerInfo = useSelector(
    (state) =>
      state.publicData.publicRestaurants.find(
        (restaurant) => restaurant._id === restaurantId
      ).ownerInfo
  );

  if (profileStatus === "loading" || !publicRestaurantOwnerInfo) {
    return <LoadingOrder />;
  }

  return (
    <RegisterContainer>
      <ProfileTitle />
      <ProfilePhoto
        profilePhotoUrl={publicRestaurantOwnerInfo.profilePhotoUrl}
        profilePhoto={publicRestaurantOwnerInfo.profilePhoto}
        disabled={true}
        isOwner={false}
      />
      <RegisterInfoContainer>
        <Name name={publicRestaurantOwnerInfo.name} disabled={true} />
        <Phone phone={publicRestaurantOwnerInfo.phone} disabled={true} />
        <Address address={publicRestaurantOwnerInfo.address} disabled={true} />
        <Email email={publicRestaurantOwnerInfo.email} disabled={true} />
        <ExtraPhone
          extraPhone={publicRestaurantOwnerInfo.extraPhone}
          disabled={true}
        />
      </RegisterInfoContainer>
    </RegisterContainer>
  );
};

export default PublicProfile;
