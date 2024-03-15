'use client'

import React, { useState } from 'react'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/layout/UseProfile";
import MenuItemForm from '../../../components/layout/MenuItemForm';
import toast from "react-hot-toast";
import Link from 'next/link';
import Left from '@/components/icons/Left';
import {redirect } from 'next/navigation';

const NewMenuItemPage = () => {
    
    const {loading, data} = useProfile();
    const [redirectToItem, setRedirectToItem] = useState(false);

    async function handleFormSubmit(ev, data){
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) => {
            const response =  await fetch('/api/menu-items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
             });
        if (response.ok) 
            resolve();
        else
            reject();
       });

       await toast.promise(savingPromise, {
        loading: 'Saving this tasty item',
        success: 'Menu Item Saved',
        error: 'Error',
       });
       setRedirectToItem(true);
    }

    if (redirectToItem) {
        return redirect('/menu-items');
    }

    if (loading) {
        return 'Loading User Info ...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }

  return (
    <section className='mt-8'>
        <UserTabs isAdmin={true} />
         <div className='max-w-2xl mx-auto mt-8'>
             <Link href={'/menu-items'} className='button'> 
                <span>Show all manu Items</span>
                <Left/>
            </Link>
         </div>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>  
  )
}

export default NewMenuItemPage