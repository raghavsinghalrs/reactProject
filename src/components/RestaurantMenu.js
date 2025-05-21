import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/UseRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { id } = useParams();
  const resInfo = useRestaurantMenu(id);
  const [expandIndex, setExpandIndex] = useState(null);

  if (!resInfo) {
    return <Shimmer />;
  }

  const { cuisines, costForTwoMessage, avgRatingString, totalRatingsString } =
    resInfo?.cards[2]?.card?.card?.info;
  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (category) =>
        category?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="flex h-full w-full justify-center items-center p-8 rounded-[1rem]">
      <div className="flex flex-col bg-[#f1ebeb] rounded-[1rem] p-4 gap-4 w-1/2">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "15rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "2em", margin: ".67em 0" }}>
              {resInfo?.cards[2]?.card?.card?.info?.name}
            </span>
            <span>{cuisines}</span>
            <span>{costForTwoMessage}</span>
            <span>
              {avgRatingString} {totalRatingsString}
            </span>
          </div>
          <img
            style={{
              height: "9rem",
              width: "9rem",
              borderRadius: "1rem",
              marginBottom: "1rem",
            }}
            src={
              CDN_URL + resInfo?.cards[2]?.card?.card?.info?.cloudinaryImageId
            }
            alt="rest-img"
          />
        </div>
        <div className="flex flex-col gap-4 max-h-[22rem] overflow-y-scroll">
          {categories.map((category, index)=> <RestaurantCategory key={index} data={category?.card?.card} expandlist={index == expandIndex ? true : false} setExpandIndex={(index) => setExpandIndex(index)} index={index}/>)}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
