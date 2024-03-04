'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ok } from 'assert';
import InfoBox from '../../components/layout/InfoBox';
import SuccessBox from '../../components/layout/SuccessBox';

const Profile = () => {
    const session = useSession();
    const [userName, setUserName] = useState( '')
    const [image, setImage] = useState('')
    const [Saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false)
    const {status} = session;

    useEffect(() => {
      if (status === 'authenticated') {
        setUserName(session.data.user.name);
        setImage(session.data.user.image);
      }
    }, [session, status])
    

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const reponse = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name : userName, image}),
           
        })
        setIsSaving(false);
        if (reponse.ok) {
            setSaved(true);
        }
    }
     async function handleFileChange(ev){
      const files = ev.target.files;
      if (files?.length === 1) {
        const data = new FormData;
        data.set('file', files[0]);
        isUploading(true);
        const response = await fetch('/api/upload',{
          method: 'POST',
          body: data,
        });

        const link = await response.json();
        setImage(link);
        isUploading(false);
      }
    }

    if (status === 'loading') {
        return <p className='p-10 text-center'>loading...</p>;
    }
    if (status === 'unauthenticated') {
        redirect('/login')
    }

    const userEmail = session?.data.user.email;
    
  return (
    <section className='mt-8 text-center'>
     <h1 className="text-centre text-primary text-4xl mb-4">
        Profile
    </h1>
        {Saved && ( <SuccessBox > Profile details Saved.</SuccessBox>)}
        {isSaving && ( <InfoBox> Saving... </InfoBox>)}

        {isUploading &&(<InfoBox> Uploading... </InfoBox>)}
       
    <div className='max-w-md mx-auto '>
       <div className='flex gap-2 items-center'>
        <div>
            <div className='p-2 rounded-lg relative max-w-120'>
              { image && (
                 <Image className='rounded-lg w-full h-full mb-2' src={image} width={250} height={250} alt={250}/>
              )}
           
            <label>
            <input type='file' className='hidden' onChange={handleFileChange}/>
            <span type='button' className='block border border-t-gray-300 text-center rounded-lg p-2 cursor-pointer'>Edit</span>
            </label>
            
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