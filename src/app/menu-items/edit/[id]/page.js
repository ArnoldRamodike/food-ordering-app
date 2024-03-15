'use client'

import React, { useEffect, useState } from 'react'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/layout/UseProfile";
import DeleteButton from "@/components/layout/DeleteButton";
import toast from "react-hot-toast";
import Link from 'next/link';
import Left from '@/components/icons/Left';
import {redirect, useParams } from 'next/navigation';
import MenuItemForm from '../../../../components/layout/MenuItemForm';

export default function EditMenuItemPage() {

    const {id} = useParams();
    const [menuItem, setMenuItem] = useState(null)
    const {loading, data} = useProfile();
    const [redirectToItem, setRedirectToItem] = useState(false);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setMenuItem(item);
            });
        })
    }, []);

    async function handleFormSubmit(ev, data){
        ev.preventDefault();
        data = {...data, _id: id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response =  await fetch('/api/menu-items', {
            method: 'PUT',
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

    function handleDeleteClick(){
       const promise = new Promise(async(resolve, reject) => {
        const res = await fetch('/api/menu-items?_id='+id, {
            method: 'DELETE',
        });
        if (res.ok) 
            resolve();
        else
            reject();

       });

       toast.promise(promise, {
        loading: 'Deleating...',
        success: 'Item Deleted',
        error: 'An Error occured.'
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
        <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
        <div className='max-w-md mx-auto mt-4'>
            <div className='max-w-xs ml-auto pl-4'>
                <DeleteButton label={'Delete menu Item'} onDelete={() => handleDeleteClick()} />
            </div>
        </div>
    </section>  
  )
}

