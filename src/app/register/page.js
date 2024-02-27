'use client'

import React, { useState } from 'react'
import Image from 'next/image';


function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false)
    const [userCreated, setUserCreated] = useState(true)

   async function handleFormSbumit(ev) {
        ev.preventDefault();
        await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
          });
        setCreatingUser(false);
    }

  return (
   <section>
     <h1 className="text-centre text-primary text-4xl ">
        Register
    </h1>

    <form className="block max-w-xs mx-auto" onSubmit={handleFormSbumit}>
        <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}></input>
        <button type="submit">Register</button>
        <div className="my-4 text-center text-gray-500"> or login with Provider</div>
        <button className="flex gap-4 justify-center">
            <Image img={'/pizza.png'} alt={'goole'} width={32} height={32} />
            Login with google
            </button>
       
    </form>
    <div>
       
    </div>
   </section>
  )
}

export default RegisterPage