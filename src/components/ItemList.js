import { useDispatch } from "react-redux";
import { CATEGORY_BASED_IMAGE_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList = (props) => {
  const { items } = props;

  const dispatch = useDispatch();
  const handleAddButton = (item) => {
    //dispatch the action
    dispatch(addItem(item));
  }
  return (
    <div className="max-h-[20rem] overflow-y-scroll flex flex-col gap-6 ml-2">
      {items?.map((item) => (
        <div key={item?.card?.info?.id} className="flex flex-col gap-2 pb-4 border-gray-200 border-b-2">
        <div className="flex justify-between gap-6">
            <div className="flex flex-col w-[82%]">
                <span className="text-[0.875rem] font-medium">{item?.card?.info?.name} {item?.card?.info?.price ? <span>- Rs.{Math.floor(item?.card?.info?.price / 100)}</span> : ''}</span>
                <span className="text-xs">{item?.card?.info?.description}</span>
            </div>
            <div className="w-[14%] relative h-max">
                <img className="rounded-2xl" src={CATEGORY_BASED_IMAGE_URL + item?.card?.info?.imageId} alt="food" />
                <span className="absolute bottom-0 bg-white rounded-2xl right-[30%] text-xs cursor-pointer" onClick={() => {
                  handleAddButton(item);
                }}>Add +</span>
            </div>    
        </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
