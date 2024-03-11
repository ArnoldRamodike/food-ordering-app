'use client'

import React, { useState } from 'react'
import UserTabs from "@/components/layout/UserTabs";
import {useProfile} from "@/components/layout/UseProfile";
import Link from 'next/link';
import EditableImage from '@/components/layout/EditableImage';
import toast from "react-hot-toast";
import Right from '@/components/icons/Right';

const MenuItemsPage = () => {

    const {loading, data} = useProfile();

    if (loading) {
        return 'Loading User Info ...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }
  return (
    <section className='mt-8 max-w-md mx-auto'>
       <UserTabs isAdmin={true} />
       <div className='mt-8'>
         <Link className='button flex' href={'/menu-items/new'}>
            <span>Create new</span>
            <Right/> 
        </Link>
       </div>
  
    </section>
    )
}

export default MenuItemsPage