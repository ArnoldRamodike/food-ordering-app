'use client'

import React, { useContext } from 'react';
import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react'
import { cartContext } from '../context/AppContext';
import ShoppingCart from '../icons/ShoppingCart'

function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const {cartProducts} = useContext(cartContext);
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <header className='flex items-center justify-between' >
    <nav className= 'flex items-center gap-8 text-gray-500 font-semibold'>
      <Link className= 'text-primary font-semibold sm:text-2xl text-lg' href="/" >
      Knechtle
      </Link>
      <div className='hidden text-sm sm:flex sm:text-lg gap-1'>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>    
      </div>
      
    </nav>
    <nav className="text-xs flex items-center gap-3 text-gray-500 font-semibold">
      {status === 'authenticated' &&(
        <>
        <Link href={'/profile'} className='whitespace-nowrap'>
          Hello, {userName}
        </Link>
         <button onClick={() => signOut()}  className='bg-primary rounded-full text-white px-4 py-2'>logout</button>
        </>
        
      )}

      {status === 'unauthenticated' &&(
        <>
          <Link href={'/login'}>Login</Link>
          <Link href={'/register'} className='bg-primary rounded-full text-white px-8 py-2'>Register</Link>
        </>
        )}  
         <Link href={'/cart'} className='relative'>
            <ShoppingCart/> 
            <span className='absolute -top-2 -right-5 text-white text-xs bg-primary py-1 px-1 rounded-full leading-3 '>{cartProducts.length}</span> 
          </Link>
    </nav>
 </header>
  )
}

export default Header