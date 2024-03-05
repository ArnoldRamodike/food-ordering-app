'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast';

const Profile = () => {
    const session = useSession();
    const [userName, setUserName] = useState( '');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setstreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const {status} = session;

    useEffect(() => {
      if (status === 'authenticated') {
        setUserName(session.data.user.name);
        setImage(session.data.user.image);
        fetch('/api/profile').then(response => {
          response.json().then(data => {
            setPhone(data.phone);
            setstreetAddress(data.streetAddress);
            setPostalCode(data.postalCode);
            setCity(data.city);
            setCountry(data.country)
          })
        });
      }
    }, [session, status])
    

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        toast('Saving...')
        const reponse = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name : userName, 
              image,
              phone,
              streetAddress,
              city,
              postalCode,
              country
            }),
           
        })

        if (reponse.ok) {
           toast.success('Save Complete')
        }else{
          toast.error('Profile Saving Error!')
        }
    }
     async function handleFileChange(ev){
      const files = ev.target.files;
      if (files?.length === 1) {
        const data = new FormData;
        data.set('file', files[0]);
        toast('Uploading...')
        const response = await fetch('/api/upload',{
          method: 'POST',
          body: data,
        });
        if (response.ok) {
          toast.success('Upload Complete')
        } else{
          toast.error('Upload Error!')
        }
        const link = await response.json();

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
       
    <div className='max-w-md mx-auto '>
       <div className='flex gap-4'>
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
            <label>First and last name</label>
            <input type='text' placeholder='First and last Name' value={userName} onChange={ev => setUserName( ev.target.value)}/>
            <input type='email' placeholder='email' disabled={true} value={userEmail}/>
            <input type='tel' placeholder='Phone number' value={phone} onChange={ev => setPhone(ev.target.value)} />
            <input type='text' placeholder='Street address'  value={streetAddress} onChange={ev => setstreetAddress(ev.target.value)} />
            <div className='flex gap-2'> 
              <input type='text' placeholder='City'  value={city} onChange={ev => setCity(ev.target.value)}  style={{margin: '0'}}/>
              <input type='text' placeholder='Postal code'  value={postalCode} onChange={ev => setPostalCode(ev.target.value)} style={{margin: '0'}}/>
            </div>
            
            <input type='text' placeholder='Country'  value={country} onChange={ev => setCountry(ev.target.value)} />

            <button type='submit'>Save</button>
        </form>
       </div>
    </div>
    </section>
  )
}

export default Profile