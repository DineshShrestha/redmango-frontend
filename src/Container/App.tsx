import React,{useEffect} from "react";
import {Header, Footer} from "../Components/Layout/";
import { Home, Login, MenuItemDetails, NotFound, Register, ShoppingCart } from "../Pages";
import {Routes, Route} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";

function App() {
  const dispatch = useDispatch();

  const {data, isLoading} = useGetShoppingCartQuery("395112c9-5103-4bbb-a127-88dc938c315f");

  useEffect(()=>{
    if(!isLoading){
      console.log(data.result);
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
