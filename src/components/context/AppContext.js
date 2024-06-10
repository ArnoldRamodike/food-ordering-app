'use client'

import React, { createContext, useEffect, useState } from 'react';
import {SessionProvider} from 'next-auth/react'
import toast from "react-hot-toast";

export const cartContext = createContext({});

export function cartProductPrice(cartProduct){
  let price = cartProduct.basePrice;

  if (cartProduct.size) {
    price += cartContext.size?.price;
  }
  if (cartContext.extras?.length > 0) {
    for(const extra of cartProduct.extras){
      price += extra.price;
    }
  }
  return price;
}

const AppProvider = ({children}) => {

  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }  
  }, []);

  function clearCart() {
    setCartProducts([]);
    saveCartPoduactsToLocalStorage([]);
  }

  function removeCartProduct(indexToRemove) {
    setCartProducts(prevCartProducts => {
      const newCartPorducts = prevCartProducts.filter((v, index) => index !== indexToRemove);
      saveCartPoduactsToLocalStorage(newCartPorducts);
    
      return newCartPorducts;
    });
    toast.success('Product removed successfully')
  }

  function saveCartPoduactsToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem('cart', JSON.stringify(cartProducts));
    }
  }



  function addToCart(product, size = null, extras=[]) {
    setCartProducts( previousProducts => {
      const cartProduct = {...product, size, extras};
      const newProducts = [...previousProducts, cartProduct];
      saveCartPoduactsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  return (
   <SessionProvider>
    <cartContext.Provider value={{cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart, }}>
          {children}
    </cartContext.Provider>

   </SessionProvider>
  )
}

export default AppProvider