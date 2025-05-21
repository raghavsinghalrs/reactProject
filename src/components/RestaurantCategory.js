import ItemList from "./ItemList";


const RestaurantCategory = (props) => {
    const {title, itemCards} = props?.data;
    const isExpand = props?.expandlist;
    const setExpandIndex = props?.setExpandIndex;
    const index = props?.index;

    return (
        <div>
            <div className="flex flex-col gap-4 justify-between w-full bg-gray-50 p-4 shadow-lg">
                <div className="flex justify-between" onClick={() => {
                    isExpand ? setExpandIndex(null) : setExpandIndex(index);
            }}>
                <span className="font-medium">{title} ({itemCards?.length})</span>
                {isExpand ? '↑' : '↓'}
                </div>
                {isExpand ? <ItemList items={itemCards}/> : null}
            </div>
        </div>
    )
}

export default RestaurantCategory;