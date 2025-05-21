import { CDN_URL } from "../utils/constants";
import { ratingIcon } from "../utils/constants";

const RestaurantCard = (restaurantData) => {
  const { restaurantInfo } = restaurantData;
  return (
    <div className="flex flex-col justify-items-start transition-transform duration-200 ease-out rounded-[1rem] cursor-pointer h-max hover:scale-105">
      <img
        style={{
          height: "10rem",
          width: "100%",
          borderRadius: "1rem",
          marginBottom: "1rem",
        }}
        src={CDN_URL + restaurantInfo?.cloudinaryImageId}
        alt="rest-img"
      />
      <div className="mx-[0.5em]">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4 className="m-0 font-[600] text-[18px] leading-[22px] text-[rgba_2,6,12,92] overflow-hidden w-full">{restaurantInfo?.name}</h4>
          <span
            style={{
              color: restaurantInfo?.availability?.opened ? "green" : "red",
            }}
          >
            {restaurantInfo?.availability?.opened ? "OPEN" : "CLOSE"}
          </span>
        </div>
        <span style={{ display: "flex", alignItems: 'center'}}>
          <img
            style={{ height: "1rem", width: "1rem" }}
            src={ratingIcon}
            alt="star"
          />
          &nbsp;{restaurantInfo?.avgRating}&nbsp;&nbsp;
          {restaurantInfo?.sla?.slaString}
        </span>
        <span className="font-[200] text-[16px] leading-[21px] text-[rgba_(2,6,12,0.6)] overflow-hidden w-full" title={restaurantInfo?.cuisines?.join(", ")}>
          {restaurantInfo?.cuisines.join(", ")}
        </span>
        <span className="font-[200] text-[16px] leading-[21px] text-[rgba_(2,6,12,0.6)] overflow-hidden w-full">{restaurantInfo?.areaName}</span>
      </div>
    </div>
  );
};

export default RestaurantCard;
