"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { ProductItem } from "@/app/api/products-data/data";

type WishListContext = {
    wishList : ProductItem[],
    addToWishList : (product:ProductItem)=>void,
    removeFromWishList : (productId: number)=>void
};

//Create Wish List Context
const wishListContext = createContext<WishListContext|undefined>(undefined);

export const WishListProvider = ({children}:{children: ReactNode})=>{
    const [wishList, setWishList] = useState<ProductItem[]>([]);

    const addToWishList = (product:ProductItem)=>{
        const exisitingProduct = wishList.find((e)=>e.id===product.id);
        if(!exisitingProduct){
            setWishList((prevWishList)=>[...prevWishList,product])
        }else{
            setWishList((prevWishList)=>prevWishList.filter((e)=>e.id!==product.id))
        }
    }

    const removeFromWishList = (prodcutId:number)=>{
        setWishList((prevWishList)=>prevWishList.filter((e)=>e.id!==prodcutId))
    }
    
    return(
        <wishListContext.Provider value={{wishList,addToWishList,removeFromWishList}}>
            {children}
        </wishListContext.Provider>
    )
};

export const useWishList = ()=>{
    const context = useContext(wishListContext);
    if(!context){
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

