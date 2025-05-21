import React, {lazy, StrictMode, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router";
import UserContext from "./utils/UserContext";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

const Demo = lazy(() => import("./components/Demo")); // code splitting, chunking, dynamic bundling, lazy loading, on demand loading

const AppLayout = () => {
  const [userName, setUserName] = useState('');
  useEffect(()=>{
    setUserName('XYZ')
  },[])
  return (
    <Provider store={appStore}>
    <UserContext.Provider value={{loggedInUser : userName, setUserName}}>
      <div className="flex flex-col gap-[1rem] min-h-full min-w-[1240px] pt-[100px]">
        <Header />
        <StrictMode>
            <Outlet/>
        </StrictMode>
      </div>
    </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children : [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path : "/contact",
        element : <Contact/>
      },
      {
        path : "/restaurants/:id",
        element : <RestaurantMenu/>
      },
      {
        path : "demo",
        element : <Suspense fallback={<h1>Loading...</h1>}><Demo/></Suspense>
      },
      {
        path: "cart",
        element : <Cart/>
      }
    ],
    errorElement : <Error/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
