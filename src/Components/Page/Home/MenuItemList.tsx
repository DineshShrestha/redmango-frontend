import React from 'react'
import {useState, useEffect} from 'react';
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import {useDispatch, useSelector} from 'react-redux';
import { setMenuItem } from '../../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../Common';
import { RootState } from '../../../Storage/Redux/store';

function MenuItemList() {
    const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
    const dispatch = useDispatch();
    const {data, isLoading} = useGetMenuItemsQuery(null);

    const searchValue = useSelector (
      (state: RootState)=> state.menuItemStore.search
    )
    useEffect(()=> {
      if(data && data.result){
        const tempMenuArray = handleFilter(searchValue);
        setMenuItems(tempMenuArray);
      }
    },[searchValue]);
    useEffect(()=> {
      if(!isLoading){
        dispatch(setMenuItem(data.result));
        setMenuItems(data.result);
      }
    },[isLoading]);
    

    const handleFilter = (search: string)=> {
      let tempMenuItems = [...data.result];

      // search funtionality
      if(search){
        const tempSearchMenuItems = [...tempMenuItems];
        tempMenuItems = tempSearchMenuItems.filter((item: menuItemModel)=> item.name.toUpperCase().includes(search.toUpperCase())
        );
      }
      return tempMenuItems;
    }
    if(isLoading){
      return <div><MainLoader/></div>
    }
  return (
    <div className='container row'>{menuItems.length>0 && menuItems.map((menuItem: menuItemModel, index: number)=>(
      <MenuItemCard menuItem={menuItem} key={index}/>
    ))}</div>
  )
}

export default MenuItemList