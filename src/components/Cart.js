import { useDispatch, useSelector } from "react-redux"
import ItemList from "./ItemList"
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const cardItems =  useSelector((store) => store.cart.items);
    const dispatch = useDispatch();

    const handleClearCartEvent = () => {
        dispatch(clearCart());
    }

    return (
        <div className="w-full text-center">
            <div className="flex w-1/2 m-auto">
            <h1 className="m-2">Cart</h1>
            {cardItems?.length > 0 && <button className="p-[0.25rem_0.5rem_0.25rem_0.5rem] border-2 bg-black text-white rounded-[0.75rem]" onClick={handleClearCartEvent}>Clear Cart</button>}
            </div>
            <div className="w-1/2 m-auto">
                <ItemList items={cardItems}></ItemList>
                {cardItems?.length === 0 && <h1>Add items to cart</h1>}
            </div>
        </div>
    )
}
export default Cart;