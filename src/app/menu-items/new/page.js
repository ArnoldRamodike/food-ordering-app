'use client'

import React, { useState } from 'react'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/layout/UseProfile";
import EditableImage from '@/components/layout/EditableImage';
import toast from "react-hot-toast";
import Link from 'next/link';
import Left from '@/components/icons/Left';
import { redirect } from 'next/dist/server/api-utils';

const NewMenuItemPage = () => {
    
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const {loading, data} = useProfile();
    const [redirectToItem, setRedirectToItem] = useState(false);

    async function handleFormSubmit(ev){
        ev.preventDefault();
        const data = {image, name, description, basePrice};
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
         <div className='max-w-md mx-auto mt-8'>
             <Link href={'/menu-items'} className='button'> 
                <span>Show all manu Items</span>
                <Left/>
            </Link>
         </div>
            
        <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
         <div className='grid items-start gap-4' style={{gridTemplateColumns: '.3fr .7fr'}}>
            <div>
                <EditableImage link={image} setLink={setImage}/>
            </div>

            <div className='grow'>
             <label>Item name</label> 
             <input type='text' value={name} onChange={ev => setName(ev.target.value)}/> 
             <label>Description</label> 
             <input type='text'  value={description} onChange={ev => setDescription(ev.target.value)}/> 
             <label>Base price</label> 
             <input type='text'  value={basePrice} onChange={ev => setBasePrice(ev.target.value)}/> 
             <button className='mb-2' type='submit'>Save</button> 
            </div>
  
         </div>
    
        </form>
    </section>  
  )
}

export default NewMenuItemPage