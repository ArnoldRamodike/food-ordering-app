'use client'

import React, { createContext, useEffect, useState } from 'react';
import {SessionProvider} from 'next-auth/react'

export const cartContext = createContext({});

const AppProvider = ({children}) => {

  const [cartProducts, setCartProducts] = useState([]);
  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }  
  }, []);

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
    <cartContext.Provider value={{cartProducts, setCartProducts, addToCart,}}>
          {children}
    </cartContext.Provider>

   </SessionProvider>
  )
}

export default AppProvider