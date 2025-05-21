import RestaurantCard from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7552878&lng=75.90946749999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const fetchNestedData =
      json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setFilteredData(fetchNestedData);
    setSearchData(fetchNestedData);
  };

  const onlineStatus = useOnlineStatus();
  const {loggedInUser, setUserName} = useContext(UserContext);

  if (!onlineStatus)
    return (
      <h1 style={{ color: "red", textAlign: "center", width: "100%" }}>
        You are offline!
      </h1>
    );

  return filteredData?.length === 0 ? (
    <div className="flex flex-col gap-4">
      <Shimmer />
    </div>
  ) : (
    <div className="flex flex-col gap-4">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "0 1rem",
        }}
      >
        <div className="w-[27%] gap-4 flex">
          <input
            type="text"
            className="border-2 w-full"
            value={searchText}
            onChange={(event) => {
              setSearchText(event?.target?.value);
              if (event?.target?.value !== "") {
                const data = searchData?.filter((item) =>
                  item?.info?.name
                    ?.toLowerCase()
                    ?.includes(event?.target?.value?.toLowerCase())
                );
                setFilteredData(data);
              } else {
                setFilteredData(searchData);
              }
            }}
          />
        </div>
        <span
          className="w-max bg-[#e3a737] cursor-pointer p-[0.3rem] rounded-[0.5rem] ml-4 text-white hover:bg-[#ebb349]"
          onClick={() => {
            const data = filteredData?.filter(
              (item) => item?.info?.avgRating > 4
            );
            setFilteredData(data);
          }}
        >
          Top Rated Restaurants
        </span>
        <div className="ml-2">
          <label>UserName: </label>
          <input type="text" className="border-2" value={loggedInUser} onChange={(event) => {
            setUserName(event.target.value)
          }}></input>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-8 p-4 max-h-[36rem] overflow-y-scroll">
        {filteredData?.map((item) => {
          return (
            <Link key={item?.info?.id} to={"/restaurants/" + item?.info?.id}>
              <RestaurantCard restaurantInfo={item?.info} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
