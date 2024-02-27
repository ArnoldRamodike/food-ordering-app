'use client'

import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import {signIn} from "next-auth/react";

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false)
    const [userCreated, setUserCreated] = useState(true)
    const [error, setError] = useState(false);

   async function handleFormSbumit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
       const response =  await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
          });
          if (response.ok) {
            setUserCreated(true);
          }
          else{
            setError(true);
          }
          setCreatingUser(false);
    }

  return (
   <section className='mt-8 text-center'>
     <h1 className="text-centre text-primary text-4xl ">
        Register
    </h1>
      {userCreated && (
        <div className='mt-4 text-center'>
          User Created <br/> now you can {' '}
          <Link className='underline' href={'/login'} >Login &raquo;</Link>
        </div>
      )}
      {error && (
        <div className='mt-4 text-center'>
         Error occured <br/> Try again later 
        
      </div>
      )}
    <form className="block max-w-xs mx-auto" onSubmit={handleFormSbumit}>
        <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={creatingUser}/>
        <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={creatingUser}/>
        <button type="submit"  disabled={creatingUser}>Register</button>

        <div className="my-4 text-center text-gray-500"> or login with Provider</div>
           <button onClick={() => signIn('google', {callbackUrl:'/'})} className="flex gap-4 justify-center">
              <Image img={'/pizza.png'} alt={'google'} width={32} height={32} />
                 Login with google
            </button>

       <div className='text-center my-4 border-t pt-4'>
        Existing account ?{' '}
        <Link className='underline ' href={'/login'}>Login here &raquo;</Link>
       </div>
    </form>
    <div>
       
    </div>
   </section>
  )
}

export default RegisterPage