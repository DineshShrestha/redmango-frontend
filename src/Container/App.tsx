import React,{useEffect} from "react";
import {Header, Footer} from "../Components/Layout/";
import { Home, MenuItemDetails, NotFound, ShoppingCart } from "../Pages";
import {Routes, Route} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useGetMenuItemByIdQuery } from "../Apis/menuItemApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";

function App() {
  const dispatch = useDispatch();

  const {data, isLoading} = useGetMenuItemByIdQuery("71ef862c-ec86-47f1-831f-a83ea923ed1d");

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
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </div>
    <Footer/>
  </div>);
}


export default App;
