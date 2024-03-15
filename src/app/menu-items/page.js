'use client'

import React, { useEffect, useState } from 'react'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/layout/UseProfile";
import Link from 'next/link';
import Image from 'next/image';
import EditableImage from '@/components/layout/EditableImage';
import toast from "react-hot-toast";
import Right from '@/components/icons/Right';
import MenuItem from '@/components/menu/MenuItem';

const MenuItemsPage = () => {

    const {loading, data} = useProfile();
    const [MenuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(MenuItem => {
                setMenuItems(MenuItem);
            })
        } )
    }, []);

    if (loading) {
        return 'Loading User Info ...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }
  return (
    <section className='mt-8 max-w-2xl mx-auto'>
       <UserTabs isAdmin={true} />
       <div className='mt-8'>
         <Link className='button flex' href={'/menu-items/new'}>
            <span>Create new</span>
            <Right/> 
        </Link>
       </div>
       <div>
        <h2 className='text-sm text-gray-500 mt-8'>Edid Menu Items</h2>
        <div className='grid grid-cols-3 gap-2'>
          {MenuItems?.length > 0 && MenuItems.map(item => (
            <Link href={'menu-items/edit/'+item._id} key={item._id} 
                className='bg-gray-200 rounded-lg p-4 button '>
                <div className='relative'>
                <Image className='rounded-md' src={item.image} alt={'Item Image'} width={100} height={100} />
                </div>
                <div className='text-center'>
                    {item.name}
                </div>
               
            </Link>
           ))}
        </div>
        
       </div>
  
    </section>
    )
}

export default MenuItemsPage