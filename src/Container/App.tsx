import React,{useEffect} from "react";
import {Header, Footer} from "../Components/Layout/";
import { Home, Login, MenuItemDetails, NotFound, Register, ShoppingCart } from "../Pages";
import {Routes, Route} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";

function App() {
  const dispatch = useDispatch();

  const {data, isLoading} = useGetMenuItemByIdQuery("b7ae37bf-09b1-4b47-9ce1-c963031d2920");

  useEffect(()=>{
    if(!isLoading){
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);
  return (
  <div>
    <Header/>
    <div className="pb-5">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/menuItemDetails/:menuItemId" element={<MenuItemDetails/>}></Route>
        <Route path="/shoppingCart" element={<ShoppingCart/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </div>
    <Footer/>
  </div>);
}


export default App;
