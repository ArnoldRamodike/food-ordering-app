'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import UserTabs from '@/components/layout/UserTabs';
import UserForm from '@/components/layout/UserForm';
import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast';

const Profile = () => {
    const session = useSession();
    const [user, setUser] = useState(null)
    const [profileFetched, setProfileFetched] = useState(false)
    
    const {status} = session;

    useEffect(() => {
        fetch('/api/profile').then(response => {
          response.json().then(data => {
            setUser(data);
            setProfileFetched(true);
          })
        });
    }, [session, status])
    

    async function handleProfileInfoUpdate(ev, data){
        ev.preventDefault();
        toast('Saving...');
        const reponse = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data ),   
        })
  
        if (reponse.ok) {
           toast.success('Save Complete')
        }else{
          toast.error('Profile Saving Error!')
        }
    }
    //  async function handleFileChange(ev){
    //   const files = ev.target.files;
    //   if (files?.length === 1) {
    //     const data = new FormData;
    //     data.set('file', files[0]);
    //     toast('Uploading...')
    //     const response = await fetch('/api/upload',{
    //       method: 'POST',
    //       body: data,
    //     });
    //     if (response.ok) {
    //       toast.success('Upload Complete')
    //     } else{
    //       toast.error('Upload Error!')
    //     }
    //     const link = await response.json();

    //   }
    // }

    if (status === 'loading' || !profileFetched) {
        return <p className='p-10 text-center'>loading...</p>;
    }
    if (status === 'unauthenticated') {
        redirect('/login')
    }

    const userEmail = session?.data.user.email;
    
  return (
    <section className='mt-8 '>
      <UserTabs  isAdmin={true}/>       
     <div className='max-w-md mx-auto mt-8 '>
      <UserForm user={user} onSave={handleProfileInfoUpdate} />
     </div>
    </section>
  )
}

export default Profile