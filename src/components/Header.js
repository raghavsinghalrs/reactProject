import { useState, useContext } from "react";
import { logo } from "../utils/constants";
import { Link } from "react-router";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setbtnName] = useState("Login");
  const {loggedInUser} = useContext(UserContext);
  const cartData = useSelector((store) => store.cart.items);
  console.log(cartData);
  return (
    <div className="flex header justify-around items-center px-[20px] shadow-[0_15px_40px_-20px_rgba(40,44,63,0.15)] fixed top-0 left-0 right-0 h-[80px] z-1000 bg-white gap-[20rem]">
      <div>
        <Link to='/'><img className="h-[5rem] cursor-pointer" src={logo} /></Link>
      </div>
      <div>
        <ul className="list-none flex gap-[3rem]">
          <li className="cursor-pointer">
            <Link to='/' >Home</Link></li>
          <li className="cursor-pointer">
            <Link to='/about'>About Us</Link></li>
          <li className="cursor-pointer">
            <Link to='/contact'>Contact Us</Link></li>
          <li className="cursor-pointer">
            <Link to='/cart'>Cart {cartData?.length}</Link></li>
          <li className="cursor-pointer">
            <Link to='demo'>Demo</Link>
          </li>
          <span className="cursor-pointer" onClick={() => {
            if(btnName === 'Login'){
              setbtnName('Logout');
            }else{
              setbtnName('Login');
            }
          }}>
            {btnName}
          </span>
          <li className="font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
