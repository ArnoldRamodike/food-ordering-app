'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ok } from 'assert';

const Profile = () => {
    const session = useSession();
    const [userName, setUserName] = useState( '')
    const [Saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false)
    const {status} = session;

    useEffect(() => {
      if (status === 'authenticated') {
        setUserName(session.data.user.name)
      }
    }, [session, status])
    

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const reponse = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name : userName}),
           
        })
        setIsSaving(false);
        if (reponse.ok) {
            setSaved(true);
        }
    }

    if (status === 'loading') {
        return <p className='p-10 text-center'>loading...</p>;
    }
    if (status === 'unauthenticated') {
        redirect('/login')
    }

    const userImg = session.data.user.image;
    const userEmail = session?.data.user.email;
    
  return (
    <section className='mt-8 text-center'>
     <h1 className="text-centre text-primary text-4xl mb-4">
        Profile
    </h1>
        {Saved && <h2 className='text-center bg-green-200 p-4 rounded-lg border-4 border-green-300'>
            Profile details Saved.
         </h2>
        }
          {isSaving && <h2 className='text-center bg-blue-200 p-4 rounded-lg border-4 border-green-300'>
            Saving...
         </h2>
        }
       
    <div className='max-w-md mx-auto '>
       <div className='flex gap-2 items-center'>
        <div>
            <div className=' p-2 rounded-lg relative'>
            <Image className='rounded-lg w-full h-full mb-2' src={userImg} width={250} height={250} alt={250}/>
            <button type='button'>Edit</button>
        </div>
        </div>
         
        <form className='grow' onSubmit={handleProfileInfoUpdate}>
            <input type='text' placeholder='First and last Name' value={userName} onChange={ev => setUserName( ev.target.value)}/>
            <input type='email' placeholder='email' disabled={true} value={userEmail}/>
            <button type='submit'>Save</button>
        </form>
       </div>
       

    </div>
    </section>
  )
}

export default Profile